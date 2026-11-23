import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

/** Mide el ancho real del contenedor para escalar los gráficos SVG sin desbordar */
export function useAnchoContenedor(): [RefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement>(null)
  const [ancho, setAncho] = useState(520)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const actualizar = () => {
      const w = el.getBoundingClientRect().width
      if (w > 0) setAncho(Math.max(240, Math.floor(w)))
    }
    actualizar()
    const observador = new ResizeObserver(() => {
      actualizar()
    })
    observador.observe(el)
    window.addEventListener('resize', actualizar)
    return () => {
      observador.disconnect()
      window.removeEventListener('resize', actualizar)
    }
  }, [])

  return [ref, ancho]
}
