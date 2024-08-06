import { useCallback, useState } from 'react'

export const useSelect = <Value,>({
  items,
  onIndexChange
}: {
  items: Value[]
  onIndexChange?: (currentIndex: number) => void
}) => {
  const [currentIndex, setCurrentIndex] = useState(-1)
  const currentItem = currentIndex > -1 ? items[currentIndex] : undefined

  const prev = useCallback(() => {
    if (!items.length) return currentIndex

    let newIndex = items.length - 1 // Default. Loop around if at the start
    if (currentIndex > 0) newIndex = currentIndex - 1

    setCurrentIndex(newIndex)
    onIndexChange?.(newIndex)
  }, [items, currentIndex])

  const next = () => {
    if (!items.length) return currentIndex

    let newIndex = 0 // Default. Loop around if at the end
    if (currentIndex < items.length - 1) newIndex = currentIndex + 1

    setCurrentIndex(newIndex)
    onIndexChange?.(newIndex)
  }
  const unselect = useCallback(() => setCurrentIndex(-1), [])

  return {
    currentItem,
    currentIndex,
    functions: { prev, next, unselect }
  }
}
