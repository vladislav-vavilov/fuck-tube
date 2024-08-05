import { useState } from 'react'

export const getSearchHistory = () => {
  const localStorageHistory = localStorage.getItem('history')
  const parsedLocalStorageHistory = JSON.parse(localStorageHistory ?? '[]')
  const history: string[] = Array.isArray(parsedLocalStorageHistory)
    ? parsedLocalStorageHistory
    : []

  return history
}

const saveToLocalStorage = (searchHistory: string[]) => {
  localStorage.setItem('history', JSON.stringify(searchHistory))
}

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState(getSearchHistory)

  const append = (value: string) => {
    setSearchHistory([value, ...searchHistory]) // Based on filtered search history
    saveToLocalStorage([value, ...getSearchHistory()]) // Based on all search history
  }

  const remove = (value: string) => {
    const newSearchHistory = searchHistory.filter((item) => value !== item)
    setSearchHistory(newSearchHistory)
    saveToLocalStorage(newSearchHistory)
  }

  const filter = (value: string) => {
    const filteredSearchHistory = searchHistory.filter((item) => {
      return item.includes(value)
    })

    setSearchHistory(filteredSearchHistory)
    return filteredSearchHistory
  }

  const resetFilter = () => setSearchHistory(getSearchHistory)

  return {
    searchHistory,
    func: { append, remove, filter, resetFilter }
  }
}
