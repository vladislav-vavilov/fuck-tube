export const getSearchHistory = () => {
  const localStorageHistory = localStorage.getItem('history')
  const parsedLocalStorageHistory = JSON.parse(localStorageHistory ?? '[]')
  const history: string[] = Array.isArray(parsedLocalStorageHistory)
    ? parsedLocalStorageHistory
    : []

  return history
}

export const deduplicateArrays = <Value extends unknown>(
  firstArray: Value[],
  secondArray: unknown[]
): Value[] => {
  return firstArray.filter((value) => !secondArray.includes(value))
}

export const deduplicate = <Values extends unknown[]>(array: Values) => {
  return Array.from(new Set(array)) as Values
}
