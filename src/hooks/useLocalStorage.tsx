import { useCallback, useEffect, useState } from 'react'

type SetState<Value> = (value: Value | ((state: Value) => Value)) => void

export const useLocalStorage = <Value,>(key: string, defaultValue: Value) => {
  const [state, setState] = useState<Value>(defaultValue)

  useEffect(() => {
    const item = localStorage.getItem(key)
    if (item) setState(JSON.parse(item))
  }, [key])

  const set: SetState<Value> = useCallback(
    (value) => {
      setState(value)
      const valueToStore = value instanceof Function ? value(state) : value
      localStorage.setItem(key, JSON.stringify(valueToStore))
    },
    [state]
  )

  return [state, set] as const
}
