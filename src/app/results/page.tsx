import { SearchResultsItems } from '@/components/SearchResults/SearchResultsItems'

type Params = {
  searchParams: { [key: string]: string | null }
}

export async function generateMetadata({ searchParams }: Params) {
  const query = searchParams.search_query

  return {
    title: query ? query : 'Results'
  }
}

export default async function SearchResults() {
  return <SearchResultsItems />
}
