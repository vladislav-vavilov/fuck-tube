import { useCallback, useState } from 'react'

export const useSelect = <Value,>(items: Value[]) => {
  const [currentIndex, setCurrentIndex] = useState<number>(-1)
  const currentItem = currentIndex > -1 ? items[currentIndex] : undefined
  console.log('select', items)

  const prev = () => {
    if (!items.length) return

    setCurrentIndex((currentIndex) => {
      if (currentIndex > 0) return currentIndex - 1
      return items.length - 1 // Loop around if at the start
    })
  }

  const next = () => {
    if (!items.length) return

    setCurrentIndex((currentIndex) => {
      if (currentIndex < items.length - 1) return currentIndex + 1
      return 0 // Loop around if at the end
    })
  }
  const unselect = useCallback(() => setCurrentIndex(-1), [])

  return {
    currentItem,
    currentIndex,
    functions: { prev, next, unselect }
  }
}
