import { CardSkeleton } from '@/components/Cards/CardSkeleton'

export default function Loading() {
  return (
    <div className='flex basis-3/4 flex-col gap-4'>
      {Array.from({ length: 8 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  )
}
