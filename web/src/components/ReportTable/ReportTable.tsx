import classNames from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import { CogIcon } from '@heroicons/react/solid'

import Button from '../Button/Button'
import DraggableItemList from '../DraggableItemList/DraggableItemList'
import Table, { SelectedFilters, TableColumn, TableRow } from '../Table/Table'
import { PlaceholderPanel } from '../PlaceholderPanel/PlaceholderPanel'
import { Switch } from '@headlessui/react'

type ReportTableProps = {
  filters: SelectedFilters
  onFilterChanged: (filter: SelectedFilters) => void
  tableColumns: Array<TableColumn>
  setTableColumns: (columns: Array<TableColumn>) => void
  tableRows: Array<TableRow> | undefined
  showCount: number
  setShowCount: (count: number) => void
  onClearFilters(): void
  filterOnActive?: boolean
  activeProperty?: string
}

const ReportTable = ({
  filters,
  onFilterChanged,
  tableColumns,
  setTableColumns,
  tableRows,
  showCount,
  setShowCount,
  onClearFilters,
  filterOnActive,
  activeProperty,
}: ReportTableProps) => {
  const [visibleFieldOrder, setVisibleFieldOrder] = useState<TableColumn[]>([])
  const [showActive, setShowActive] = useState<boolean>(true)
  const [showColumnDrawer, setShowColumnDrawer] = useState(false)

  useEffect(
    () => setVisibleFieldOrder(tableColumns.filter((c) => c.active)),
    [tableColumns]
  )

  useEffect(() => {
    if (!filterOnActive || !activeProperty || !tableRows) return
    const updated = {
      ...filters,
      filter: {
        ...filters.filter,
        [activeProperty]: showActive ? '1' : '0',
      },
    }
    onFilterChanged(updated)
  }, [showActive])

  const showNotLoadingNoDataPlaceholder = useCallback(() => {
    return (
      tableRows && tableRows.length === 0 && Object.keys(filters).length === 0
    )
  }, [tableRows, filters])

  const TableRows = () => (
    <>
      <label htmlFor="location" className="text-xs text-gray-700 mr-1">
        Show
      </label>
      <select
        id="location"
        name="location"
        className="w-full text-xs rounded-md py-0.5 pl-2 pr-6 border-gray-300"
        defaultValue={showCount}
        onChange={(e) => setShowCount(Number(e.target.value))}
      >
        <option value={20}>20 rows</option>
        <option value={40}>40 rows</option>
        <option value={60}>60 rows</option>
        <option value={80}>80 rows</option>
        <option value={100}>100 rows</option>
      </select>
    </>
  )

  return (
    <>
      <div className="flex flex-1 flex-col bg-white px-6 py-9 rounded-md">
        <div className="flex w-full justify-between items-center mb-4 mobile:flex-col mobile:items-start">
          <div className="flex items-center mobile:hidden">
            <TableRows />
          </div>
          <div className="flex items-center mobile:w-full mobile:justify-between">
            {filterOnActive && (
              <div className="flex items-center">
                <Switch.Group>
                  <Switch.Label className="text-sm font-medium mr-4 mobile:text-xs">
                    Active
                  </Switch.Label>
                  <Switch
                    checked={showActive}
                    onChange={() => setShowActive((isActive) => !isActive)}
                    className={`${
                      showActive ? 'bg-primary-color' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        showActive ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white`}
                    />
                  </Switch>
                </Switch.Group>
              </div>
            )}
            <Button
              className="rounded-md bg-gray-50 text-gray-900 border-gray-200 border mx-6 mobile:max-h-[50px] mobile:text-xs"
              onClick={onClearFilters}
            >
              Clear Filters
            </Button>
            <Button
              className="w-11 h-11 rounded-full bg-gray-50 border-gray-200 border"
              circular
              buttonType="outline"
              icon={<CogIcon className="w-5 text-primary-700" />}
              onClick={() => setShowColumnDrawer(true)}
            />
          </div>

          <div className="items-center hidden mobile:flex mt-2">
            <TableRows />
          </div>
        </div>

        {!tableRows && (
          <PlaceholderPanel>
            <div className="w-16 h-16 rounded-full bg-blue-100 flex justify-center items-center mb-5">
              <div
                className={classNames(
                  'w-6 h-6 bg-contain bg-no-repeat bg-star'
                )}
              />
            </div>
            <p className="text-gray-600">Loading data...</p>
          </PlaceholderPanel>
        )}

        {showNotLoadingNoDataPlaceholder() ? (
          <PlaceholderPanel>
            <div className="w-16 h-16 rounded-full bg-blue-100 flex justify-center items-center mb-5">
              <div
                className={classNames(
                  'w-6 h-6 bg-contain bg-no-repeat bg-folder'
                )}
              />
            </div>
            <p className="text-gray-600">
              You currently do not have any data to display.
            </p>
          </PlaceholderPanel>
        ) : (
          !!visibleFieldOrder.length &&
          tableRows && (
            <Table
              filters={filters}
              columns={visibleFieldOrder}
              rows={tableRows}
              onFilterChanged={onFilterChanged}
            />
          )
        )}

        {showColumnDrawer && (
          <DraggableItemList
            header="Table Columns Settings"
            subTitle="Select the columns you would like to display."
            items={tableColumns}
            onListChanged={(newList) =>
              setTableColumns(newList as TableColumn[])
            }
            handleClose={() => setShowColumnDrawer(false)}
          />
        )}
      </div>
    </>
  )
}

export default ReportTable
