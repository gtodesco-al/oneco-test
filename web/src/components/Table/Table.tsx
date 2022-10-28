import { useState } from 'react'
import classNames from 'classnames'

import { objectToDottedString } from '../../utils/object'

import CommandMenu from './CommandMenu'
import ExactFilter from './ExactFilter'
import EnumeratedFilter from './EnumeratedFilter'
import DateRangeFilter from './DateRangeFilter'

export enum ColumnFilterType {
  Exact = 'exact',
  Enumerated = 'enumerated',
  DateRange = 'date-range',
}

export type ColumnFilter = {
  type: ColumnFilterType
  options?: any
}

export type OptionsColumnOption = {
  text: string | ((row: TableRow) => JSX.Element)
  onOptionClick: (row: TableRow) => void
  active?: boolean | ((row: TableRow) => boolean)
}

export type TableColumn = {
  id: string
  header: string
  active: boolean
  locked?: boolean
  filter?: ColumnFilter
  description: string
  options?: Array<OptionsColumnOption>
  render?: (row: any, columnID: string) => JSX.Element
}

export type TableRow = {
  [key: string]: any
}

type TableProps = {
  filters: SelectedFilters
  onFilterChanged: (filter: SelectedFilters) => void
  columns: Array<TableColumn>
  rows: Array<TableRow>
}

export type SelectedFilters = {
  filter?: { [key: string]: string }
  sort?: { [key: string]: string }
}

const Table = ({ columns, filters, onFilterChanged, rows }: TableProps) => {
  const [, setActiveRow] = useState<number>()

  const isLastRecord = (colIndex: number) => {
    return colIndex + 1 === columns.length && columns[colIndex]?.options
  }

  function getFilterComponent(
    header: string,
    { type, options }: ColumnFilter,
    id: string,
    filter: any | undefined,
    sort: any | undefined
  ): JSX.Element | null {
    const columnRoot = id.split('.')[0]
    function updateFilters({ filter, sort }: SelectedFilters) {
      let updated = { filter: { ...filters.filter }, sort: { ...filters.sort } }
      if (filter) {
        updated = {
          ...updated,
          filter: {
            ...filters.filter,
            ...filter,
          },
        }
      } else {
        if (filters?.filter) {
          delete updated.filter[columnRoot]
        }
      }

      if (sort) {
        updated = {
          ...updated,
          sort: {
            ...filters.sort,
            ...sort,
          },
        }
      } else {
        if (filters?.sort) {
          delete updated.sort[columnRoot]
        }
      }
      onFilterChanged(updated)
    }

    const flattenedFilters = objectToDottedString(filter)[id]
    const flattenedSort = objectToDottedString(sort)[id]

    switch (type) {
      case ColumnFilterType.Exact:
        return (
          <ExactFilter
            header={header}
            column={id}
            filter={flattenedFilters}
            sort={flattenedSort}
            onFilterChanged={updateFilters}
          />
        )
      case ColumnFilterType.Enumerated:
        return (
          <EnumeratedFilter
            header={header}
            options={options}
            column={id}
            filter={flattenedFilters?.split(',')}
            sort={flattenedSort}
            onFilterChanged={updateFilters}
          />
        )
      case ColumnFilterType.DateRange:
        return (
          <DateRangeFilter
            header={header}
            column={id}
            sort={sort && sort[id]}
            filter={filter && filter[id]}
            onFilterChanged={updateFilters}
          />
        )
    }
  }

  return (
    <div className="overflow-x-auto">
      <table
        className="divide-y divide-gray-300 border-separate overflow-x-auto w-full"
        id="data-grid"
      >
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, columnIndex: number) => {
              if (column.active) {
                return (
                  <th
                    key={`column-header-${column.id}`}
                    scope="col"
                    className={classNames(
                      'px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase',
                      {
                        ['sticky right-0 border-l-2 bg-gray-50 min-w-0']:
                          // we only want the above styles to apply to "options" columns, like
                          // in 'Transactions' and 'Batches' reports
                          isLastRecord(columnIndex) && !column.header,
                        ['min-w-[200]']: !isLastRecord(columnIndex),
                      }
                    )}
                  >
                    <div className="flex justify-between items-center w-full whitespace-nowrap">
                      {column.filter
                        ? getFilterComponent(
                            column.header,
                            column.filter,
                            column.id,
                            filters.filter,
                            filters.sort
                          )
                        : column.header}
                    </div>
                  </th>
                )
              }
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {rows.map((row, rowIndex) => (
            <tr
              key={`table-row-index-${rowIndex}`}
              className={rowIndex % 2 === 0 ? undefined : 'bg-gray-50'}
            >
              {columns.map((column, colIndex) => {
                if (!isLastRecord(colIndex) && column.active) {
                  return (
                    <td
                      key={`table-column-index-${colIndex}`}
                      className="whitespace-nowrap px-3 py-2 text-sm text-gray-600"
                    >
                      {column.render && typeof column.render === 'function'
                        ? column.render(row, column.id)
                        : row[column.id as keyof object]}
                    </td>
                  )
                }

                if (column.active) {
                  return (
                    <td
                      key={`table-column-index-last-${colIndex}`}
                      className={classNames(
                        'whitespace-nowrap px-4 py-2 sticky right-0 border-l-2',
                        rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      )}
                    >
                      <CommandMenu
                        column={column}
                        rowIndex={rowIndex}
                        row={row}
                        setActiveRow={setActiveRow}
                      />
                    </td>
                  )
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && Object.keys(filters).length > 0 && (
        <p className="pt-8 text-center text-sm text-gray-600">
          No matches found.
        </p>
      )}
    </div>
  )
}

export default Table
