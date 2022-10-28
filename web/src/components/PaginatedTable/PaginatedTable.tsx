import { useEffect, useState } from 'react'
import qs from 'qs'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { api } from '../../api'
import { useLocations } from '../../hooks/useLocations'

import { PageHeader } from '../PageHeader/PageHeader'
import Paginate, { PageQuery } from '../Paginate/Paginate'
import ReportTable from '../ReportTable/ReportTable'
import { SelectedFilters, TableColumn, TableRow } from '../Table/Table'

type PaginatedTableProps = {
  translationNamespace: string
  navigationText: string
  headerText: string
  columns: TableColumn[]
  serviceName: string
  requestRequiresLocation?: boolean
  columnOrderStorageID: string
}

function PaginatedTable({
  columns,
  serviceName,
  translationNamespace,
  navigationText,
  headerText,
  requestRequiresLocation = true,
  columnOrderStorageID,
}: PaginatedTableProps) {
  const { t } = useTranslation(translationNamespace)

  const navigate = useNavigate()
  const location = useLocation()
  const search = qs.parse(location.search.slice(1))
  const { filter, sort, page } = search
  const { selectedLocation } = useLocations()

  const [rows, setRows] = useState<TableRow[] | undefined>()
  const [columnOrder, setColumnOrder] = useState<TableColumn[]>([])
  const [totalRows, setTotalRows] = useState<number>(0)
  const [columnFilters, setColumnFilters] = useState<SelectedFilters>({
    filter,
    sort,
  } as SelectedFilters)

  let pageDefaults = { size: '20', number: '1' }
  if (page) pageDefaults = page as { size: string; number: string }

  const [showCount, setShowCount] = useState<number>(
    parseInt(pageDefaults.size)
  )
  const [selectedPage, setSelectedPage] = useState<number>(
    parseInt(pageDefaults.number)
  )

  useEffect(() => {
    const order = window.localStorage.getItem(columnOrderStorageID)
    if (!order) {
      setColumnOrder(columns)
      return
    }

    try {
      const storedOrder = JSON.parse(order) as { id: string; active: boolean }[]
      const displayOrder = storedOrder.map((o) => {
        const found = columns.find((w) => w.id === o.id)
        // if we find one display order item that is not valid, just recent all widgets to
        // the default order
        if (!found) throw Error('unidentified column')
        found.active = Boolean(o.active)
        return found
      })

      setColumnOrder(displayOrder.length === 0 ? columns : displayOrder)
    } catch (e) {
      setColumnOrder(columns)
    }
  }, [columns])

  useEffect(() => {
    const orderToStore = columnOrder.reduce((order, w) => {
      order.push({ id: w.id, active: w.active })
      return order
    }, [] as { id: string; active: boolean }[])
    window.localStorage.setItem(
      columnOrderStorageID,
      JSON.stringify(orderToStore)
    )
  }, [columnOrder])

  useEffect(() => {
    if (!selectedLocation.id || columnOrder.length === 0) return

    async function getListOfItems(
      { filter, sort }: SelectedFilters,
      page: PageQuery
    ) {
      let filters = { ...filter }
      if (requestRequiresLocation) {
        const locationID = { location_id: selectedLocation.id }
        filters = { ...filters, ...locationID }
      }

      // TODO how do I dynamically assign this name?
      const items = await api.service(serviceName as any).find({
        paginate: true,
        query: {
          page,
          filter: filters,
          sort: { ...sort },
        },
      })
      setRows(items.list)
      setTotalRows(items.pagination.total_count)
    }
    if (selectedPage && showCount) {
      getListOfItems(columnFilters, {
        number: selectedPage,
        size: showCount,
      })
    }
  }, [selectedLocation.id, location.search, columnOrder])

  useEffect(() => {
    if (!selectedLocation.id) return

    const query = {
      page: { number: selectedPage, size: showCount },
      ...columnFilters,
    }
    navigate(`${location.pathname}?${qs.stringify(query)}`)
  }, [selectedLocation, columnFilters, selectedPage, showCount])

  return (
    <>
      <PageHeader navText={t(navigationText)} headerText={t(headerText)} />
      <ReportTable
        filters={columnFilters}
        onFilterChanged={setColumnFilters}
        tableColumns={columnOrder}
        setTableColumns={setColumnOrder}
        tableRows={rows}
        showCount={showCount}
        setShowCount={setShowCount}
        onClearFilters={() => setColumnFilters({})}
      />
      <div className="mt-4 mb-8">
        <Paginate
          total={totalRows}
          limit={showCount}
          offset={selectedPage}
          onPageChange={setSelectedPage}
        />
      </div>
    </>
  )
}

export default PaginatedTable
