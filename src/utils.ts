import { twMerge } from 'tailwind-merge'
import { clsx, ClassArray } from 'clsx'

export const cn = (...input: ClassArray) => {
  return twMerge(clsx(...input))
}
