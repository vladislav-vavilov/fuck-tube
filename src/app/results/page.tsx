import { SearchResultsItems } from '@/components/SearchResults/SearchResultsItems'

interface SearchResultsPageProps {
  searchParams: { [key: string]: string | null }
}

export async function generateMetadata({
  searchParams
}: SearchResultsPageProps) {
  const query = searchParams.search_query

  return {
    title: `${query ? query : 'Results'} - TouYube`
  }
}

export default function SearchResultsPage() {
  return <SearchResultsItems />
}
