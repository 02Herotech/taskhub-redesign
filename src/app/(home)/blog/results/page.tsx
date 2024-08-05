import SearchResultsContent from "@/components/blog/SearchResult"
import { Suspense } from "react"

const SearchResults = () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <SearchResultsContent />
        </Suspense>
    )
}

export default SearchResults