import SearchResults from '@/components/SearchResults/SearchResults'
import { Metadata } from 'next'

type Props = {
  searchParams: { [key: string]: string | undefined }
}

export async function generateMetadata({
  searchParams
}: Props): Promise<Metadata> {
  return {
    title: searchParams.search_query ?? 'TuoYube - Results'
  }
}

export default function Results() {
  return <SearchResults />
}
