interface PaginationProps {
  totalElements?: number
  totalPages: number
  pageNumber: number
  pageSize?: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export default function Pagination({
  totalElements,
  totalPages,
  pageNumber,
  setPage
}: PaginationProps) {
  // Convert zero-based pageNumber to one-based for display
  const currentPage = pageNumber + 1

  // Function to determine which page numbers to show
  const getPageNumbers = () => {
    const pageNumbers = []

    // For small number of pages, show all
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
      return pageNumbers
    }

    // Always show first page
    pageNumbers.push(1)

    // Dynamic ellipsis behavior
    if (currentPage < 4) {
      // Near the start, show more pages at the beginning
      pageNumbers.push(2, 3, 4, 5)
      pageNumbers.push("ellipsis")
      pageNumbers.push(totalPages)
    } else if (currentPage > totalPages - 3) {
      // Near the end, show more pages at the end
      pageNumbers.push("ellipsis")
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // In the middle, show pages around current page
      if (currentPage - 2 > 2) {
        pageNumbers.push("ellipsis")
      } else {
        pageNumbers.push(2)
      }

      // Pages around current page
      pageNumbers.push(currentPage - 1, currentPage, currentPage + 1)

      if (currentPage + 2 < totalPages) {
        pageNumbers.push("ellipsis")
      } else {
        pageNumbers.push(totalPages - 1)
      }

      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  // If there are no pages, don't render pagination
  if (totalPages <= 1) return null

  const pageNumbers = getPageNumbers()

  const handleNext = () => {
    if (pageNumber < totalPages - 1) {
      setPage(pageNumber + 1)
    }
  }

  const handlePrev = () => {
    if (pageNumber > 0) {
      setPage(pageNumber - 1)
    }
  }

  return (
    <nav className="flex justify-center items-center space-x-2 my-4">
      {/* Previous page button */}
      <button
        onClick={() => handlePrev()}
        className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 text-indigo-800"
        aria-label="Go to previous page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Page numbers */}
      {pageNumbers.map((page, index) => {
        if (page === "ellipsis") {
          return (
            <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-gray-700">
              ...
            </span>
          )
        }

        const isCurrentPage = page === currentPage

        return (
          <button
            key={`page-${page}`}
            onClick={() => setPage(page - 1)}
            className={`w-10 h-10 flex items-center justify-center rounded-md ${isCurrentPage
              ? "bg-indigo-800 text-white"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            aria-current={isCurrentPage ? "page" : undefined}
            aria-label={`Go to page ${page}`}
          >
            {page}
          </button>
        )
      })}

      {/* Next page button */}
      <button
        onClick={() => handleNext()}
        className="w-10 h-10 flex items-center justify-center rounded-md bg-indigo-800 text-white"
        aria-label="Go to next page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </nav>
  )
}
