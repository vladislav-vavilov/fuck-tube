export const getSearchHistory = () => {
  const localStorageHistory = localStorage.getItem('history')
  const parsedLocalStorageHistory = JSON.parse(localStorageHistory ?? '[]')
  const history: string[] = Array.isArray(parsedLocalStorageHistory)
    ? parsedLocalStorageHistory
    : []

  return history
}

export const appendSearchHistory = (query: string) => {
  const history = getSearchHistory()

  if (history.includes(query)) return
  if (history.length > 15) history.shift()

  history.push(query)
  localStorage.setItem('history', JSON.stringify(history))
}

export const removeDuplicates = (
  firstArray: unknown[],
  secondArray: unknown[]
) => {
  return firstArray.filter((value) => !secondArray.includes(value))
}
