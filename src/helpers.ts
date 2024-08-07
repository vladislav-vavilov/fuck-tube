export const remove = <Value>({
  from,
  toRemove
}: {
  from: Value[]
  toRemove: unknown | unknown[]
}) => {
  return from.filter((value) => {
    if (Array.isArray(toRemove)) return !toRemove.includes(value)
    return value !== toRemove
  })
}
