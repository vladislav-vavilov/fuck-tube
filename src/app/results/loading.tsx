import { CardSkeleton } from '@/components/Cards/CardSkeleton'

export default function Loading() {
  return (
    <div className='flex w-full flex-col gap-4'>
      {Array.from({ length: 4 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  )
}
