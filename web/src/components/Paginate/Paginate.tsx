import { useEffect, useState } from 'react'
import { range } from 'lodash'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  DotsHorizontalIcon,
} from '@heroicons/react/solid'

import Button from '../../components/Button/Button'

export type PageQuery = {
  number: number
  size: number
}

export type PaginateProps = {
  // the total number of data items
  total: number
  // the number of items per page
  limit: number
  // the current page
  offset: number
  // called when the page number changes
  onPageChange: (page: number) => void
}

/**
 * Six total cirlces
 * If page 1, 2, 3, 4 display "1, 2, 3, 4 ... {numberOfPages}"
 *                                         ^ () => onPageChange()
 * If page > 4, display "1 ... {page} {page + 1} ... {numberOfPages}"
 *                         ^ onPageChange(page - 1) ^ onPageChange(page + 2)
 */

function Paginate({ total, limit, offset, onPageChange }: PaginateProps) {
  const [pages, setPages] = useState<number[]>([])
  const [numberOfPages, setNumberofPages] = useState<number>(
    Math.ceil(total / limit)
  )

  const to = limit * offset
  const [toItemCount, setToItemCount] = useState<number>(
    to > total ? total : to
  )

  useEffect(() => {
    setNumberofPages(Math.ceil(total / limit))
  }, [total, limit])

  useEffect(() => {
    if (offset > numberOfPages) onPageChange(1)
  }, [numberOfPages])

  useEffect(() => {
    if (numberOfPages < 6) {
      setPages(range(1, numberOfPages + 1))
    } else {
      let pages: number[] = [1, 2, 3, 4, 5, 6]
      if (offset <= 4) {
        pages = [1, 2, 3, 4, -3, numberOfPages]
      }
      if (offset > 4) {
        pages = [1, -1, offset, offset + 1, -2, numberOfPages]
      }
      if (offset > numberOfPages - 4 && offset <= numberOfPages) {
        pages = [
          1,
          -1,
          numberOfPages - 3,
          numberOfPages - 2,
          numberOfPages - 1,
          numberOfPages,
        ]
      }
      setPages(pages)
    }
  }, [numberOfPages, offset])

  useEffect(() => {
    const to = limit * offset
    setToItemCount(to > total ? total : to)
  }, [offset, limit, total])

  function getAdvanceFn(slot: number): () => void {
    if (slot === -3) return () => onPageChange(5)
    if (slot === -2) return () => onPageChange(offset + 2)
    if (slot === -1) return () => onPageChange(offset - 2)
    return () => onPageChange(slot)
  }

  if (numberOfPages < 1) return null
  return (
    <div className="flex justify-between items-center">
      <div className="text-xs text-gray-500 mb-1 flex gap-2">
        Showing {offset === 1 ? 1 : (offset - 1) * limit + 1} to {toItemCount}{' '}
        of {total} results
      </div>
      {numberOfPages > 1 && (
        <div className="flex items-center">
          <a
            href="#"
            onClick={() => onPageChange(offset - 1)}
            className="mr-3 h-5 w-5 text-gray-400"
          >
            {offset !== 1 && <ChevronDoubleLeftIcon aria-hidden="true" />}
          </a>
          <div className="flex gap-x-1">
            {pages.map((page) => (
              <Button
                key={`page-${page}`}
                circular
                className={`w-8 h-8 bg-white shadow-sm border solid ${
                  page === offset ? 'border-primary-700' : 'border-gray-200'
                }`}
                buttonType="outline"
                onClick={() => getAdvanceFn(page)()}
              >
                {page > 0 ? (
                  page
                ) : (
                  <DotsHorizontalIcon className="w-4 text-gray-500" />
                )}
              </Button>
            ))}
          </div>
          <a
            href="#"
            onClick={() => onPageChange(offset + 1)}
            className="ml-3 h-5 w-5 text-gray-400"
          >
            {offset !== numberOfPages && (
              <ChevronDoubleRightIcon aria-hidden="true" />
            )}
          </a>
        </div>
      )}
    </div>
  )
}

export default Paginate
