import { useEffect, useRef } from 'react'

function useMouted () {
  const mounted = useRef(false)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  return mounted
}
export default useMouted
