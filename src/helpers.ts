export const removeDuplicates = (
  firstArray: unknown[],
  secondArray: unknown[]
) => {
  return firstArray.filter((value) => !secondArray.includes(value))
}
