import { get, ref } from 'firebase/database'
import { database } from '../firebase/firebase'
import type { Titulo } from '../types'

// El JSON del Sprint 1 se importó en la raíz de la base de datos
export const RUTA_TITULOS = '/'

// Realtime Database no guarda las claves con valor null, así que se restauran al leer
function restaurarNulos(t: Titulo): Titulo {
  return {
    ...t,
    director: t.director ?? null,
    cast: t.cast ?? null,
    country: t.country ?? null,
    date_added: t.date_added ?? null,
    rating: t.rating ?? null,
    duration_minutes: t.duration_minutes ?? null,
    seasons: t.seasons ?? null,
  }
}

export async function obtenerTitulos(ruta: string): Promise<Titulo[] | null> {
  const referencia = ref(database, ruta)

  const snapshot = await get(referencia)

  if (snapshot.exists()) {
    // La base guarda el arreglo como un objeto indexado (0, 1, 2...), por eso se usa Object.values
    const registros = Object.values(snapshot.val() as Record<string, Titulo | null>)
    return registros.filter((t): t is Titulo => t !== null).map(restaurarNulos)
  }

  return null
}
