import getWikiResults from '@/lib/getWikiResults'
import Item from './components/Item'

type Props = {
  params: {
    searchTerm: string
  }
}

export async function generateMetadata({ params: { searchTerm } }: Props) {
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm)
  const data = await wikiData
  const displayTerm = searchTerm.replaceAll('%20', ' ')

  if (!data?.query?.pages) {
    return {
      title: `${displayTerm} not found.`,
    }
  }

  return {
    title: displayTerm,
    description: `Search results for ${displayTerm}`,
  }
}

export default async function SearchResults({ params: { searchTerm } }: Props) {
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm)
  const data = await wikiData
  const results: Result[] | undefined = data?.query?.pages

  return (
    <main className='mx-auto min-h-screen max-w-lg bg-slate-200 py-1'>
      {results ? (
        Object.values(results).map((result) => (
          <Item key={result.pageid} result={result} />
        ))
      ) : (
        <h2 className='p-2 text-xl'>{`${searchTerm} not found.`}</h2>
      )}
    </main>
  )
}
