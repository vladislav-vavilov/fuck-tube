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

export const secondsToDDHHMMSS = (seconds: number) => {
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: Math.floor(seconds % 60),
    get string() {
      return `
          ${this.days > 0 ? this.days + 'd' : ''}
          ${this.hours > 0 ? this.hours + 'h' : ''} 
          ${this.minutes > 0 ? this.minutes + 'm' : ''}
          ${this.seconds}s
        `
    }
  }
}

export const formatNumber = (value: number) => {
  const { format } = Intl.NumberFormat('en', { notation: 'compact' })
  return format(value)
}
