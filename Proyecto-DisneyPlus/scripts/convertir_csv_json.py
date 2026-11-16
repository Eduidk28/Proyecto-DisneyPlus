import csv
import json
import re
from collections import Counter
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CSV_PATH = ROOT / 'data' / 'disney_plus_titles.csv'
JSON_PATH = ROOT / 'data' / 'disney_plus_titles.json'
COLUMNS = ['show_id', 'type', 'title', 'director', 'cast', 'country', 'date_added', 'release_year', 'rating', 'duration', 'listed_in', 'description']

def clean(value):
    value = (value or '').strip()
    return value or None

def transform(row, number):
    item = {key: clean(row[key]) for key in COLUMNS}
    item['release_year'] = int(item['release_year']) if item['release_year'] else None
    if item['date_added']:
        item['date_added'] = datetime.strptime(item['date_added'], '%d/%m/%Y').strftime('%Y-%m-%d')
    item['duration_minutes'] = None
    item['seasons'] = None
    duration = item['duration']
    if duration:
        minutes = re.fullmatch(r'(\d+)\s+min', duration, re.I)
        seasons = re.fullmatch(r'(\d+)\s+Seasons?', duration, re.I)
        if minutes:
            item['duration_minutes'] = int(minutes.group(1))
        elif seasons:
            item['seasons'] = int(seasons.group(1))
        else:
            raise ValueError(f'Duración no reconocida en fila {number}: {duration}')
    return item

def main():
    with CSV_PATH.open(encoding='cp1252', newline='') as file:
        reader = csv.DictReader(file, delimiter=';')
        if reader.fieldnames != COLUMNS:
            raise ValueError(f'Columnas inesperadas: {reader.fieldnames}')
        records = []
        for number, row in enumerate(reader, 2):
            if None in row or any(value is None for value in row.values()):
                raise ValueError(f'Cantidad incorrecta de columnas en fila {number}')
            records.append(transform(row, number))
    with JSON_PATH.open('w', encoding='utf-8') as file:
        json.dump(records, file, ensure_ascii=False, indent=2, allow_nan=False)
    with JSON_PATH.open(encoding='utf-8') as file:
        verified = json.load(file)
    assert len(verified) == len(records) == 1450
    assert all(isinstance(r['release_year'], int) for r in verified)
    assert all(r['date_added'] is None or re.fullmatch(r'\d{4}-\d{2}-\d{2}', r['date_added']) for r in verified)
    assert all(r['duration_minutes'] is None or isinstance(r['duration_minutes'], int) for r in verified)
    assert all(r['seasons'] is None or isinstance(r['seasons'], int) for r in verified)
    print(f'JSON validado: {len(verified)} registros, {len(verified[0])} campos.')
    print('Valores faltantes:')
    for key in COLUMNS:
        print(f'  {key}: {sum(r[key] is None for r in verified)}')
    print(f'Archivo generado: {JSON_PATH}')

if __name__ == '__main__':
    main()
