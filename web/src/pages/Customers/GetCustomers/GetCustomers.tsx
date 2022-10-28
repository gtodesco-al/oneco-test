import { get } from 'lodash'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { api } from '../../../api'

import ActiveStatus from '../../../components/ActiveStatus/ActiveStatus'
import Button from '../../../components/Button/Button'
import Link from '../../../components/Link/Link'
import { PageHeader } from '../../../components/PageHeader/PageHeader'
import Paginate, { PageQuery } from '../../../components/Paginate/Paginate'
import ReportTable from '../../../components/ReportTable/ReportTable'
import {
  ColumnFilterType,
  TableColumn,
  TableRow,
  SelectedFilters,
} from '../../../components/Table/Table'

import { useLocations } from '../../../hooks/useLocations'

import {
  deactivateCustomer,
  activateCustomer,
} from '../utils/services/customers'
import { useUserProfile } from '../../../hooks/useUserProfile'
import {
  canCreateCustomer,
  canDeactivateCustomer,
  canEditCustomer,
  canReactivateCustomer,
  canViewCustomer,
  canChargeCustomer,
} from '../utils/permissions'

const CUSTOMERS_COLUMN_ORDER = 'fortis:display-order:customers'

export const GetCustomersPrivs = ['v2.contacts.get']

function GetCustomers() {
  const { selectedLocation } = useLocations()
  const { userProfile } = useUserProfile()
  const navigate = useNavigate()

  const { t } = useTranslation('Customers')

  const [customers, setCustomers] = useState<TableRow[] | undefined>(undefined)
  const [totalCustomers, setTotalCustomer] = useState<number>(0)
  const [columnFilters, setColumnFilters] = useState<SelectedFilters>({})
  const [showCount, setShowCount] = useState<number>(20)
  const [selectedPage, setSelectedPage] = useState<number>(1)

  const [columnDisplayOrder, setColumnDisplayOrder] = useState<TableColumn[]>(
    []
  )

  async function getCustomers(
    { filter, sort }: SelectedFilters,
    page: PageQuery
  ) {
    const locationID = { location_id: selectedLocation.id }
    const customers = await api.service('contacts').find({
      paginate: true,
      query: {
        page,
        filter: { ...locationID, ...filter },
        sort: { ...sort },
      },
    })
    setCustomers(customers.list)
    setTotalCustomer(customers.pagination.total_count)
  }

  useEffect(() => {
    if (!selectedLocation.id || columnDisplayOrder.length === 0) return
    const page = { number: selectedPage, size: showCount }
    getCustomers(columnFilters, page)
  }, [
    selectedLocation.id,
    columnDisplayOrder,
    columnFilters,
    selectedPage,
    showCount,
  ])

  useEffect(() => {
    const order = window.localStorage.getItem(CUSTOMERS_COLUMN_ORDER)
    if (!order) {
      setColumnDisplayOrder(customersColumns)
      return
    }

    try {
      const storedOrder = JSON.parse(order) as { id: string; active: boolean }[]
      const displayOrder = storedOrder.map((o) => {
        const found = customersColumns.find((c) => c.id === o.id)
        // if we find one display order item that is not valid, just recent all widgets to
        // the default order
        if (!found) throw Error('unidentified column')
        found.active = Boolean(o.active)
        return found
      })
      setColumnDisplayOrder(displayOrder)
    } catch (e) {
      setColumnDisplayOrder(customersColumns)
    }
  }, [])

  useEffect(() => {
    const orderToStore = columnDisplayOrder.reduce((order, w) => {
      order.push({ id: w.id, active: w.active })
      return order
    }, [] as { id: string; active: boolean }[])
    window.localStorage.setItem(
      CUSTOMERS_COLUMN_ORDER,
      JSON.stringify(orderToStore)
    )
  }, [columnDisplayOrder])

  const customersColumns = [
    {
      id: 'first_name',
      header: 'First Name',
      active: true,
      render: (customer: TableRow) => (
        <Link
          to={`/customers/view/${customer.id}`}
          text={customer.first_name}
        />
      ),
      locked: true,
    },
    {
      id: 'last_name',
      header: 'Last Name',
      active: true,
      locked: true,
    },
    {
      id: 'email',
      header: 'Email',
      active: true,
      filter: {
        type: ColumnFilterType.Exact,
      },
    },
    {
      id: 'account_number',
      header: 'Customer Number',
      active: true,
      filter: {
        type: ColumnFilterType.Exact,
      },
    },
    {
      id: 'address.street',
      header: 'Street',
      active: true,
      render: (transaction: TableRow, columnID: string) => {
        return get(transaction, columnID)
      },
      filter: {
        type: ColumnFilterType.Exact,
      },
    },
    {
      id: 'address.city',
      header: 'City',
      active: true,
      render: (transaction: TableRow, columnID: string) => {
        return get(transaction, columnID)
      },
      filter: {
        type: ColumnFilterType.Exact,
      },
    },
    {
      id: 'address.state',
      header: 'State',
      active: true,
      render: (transaction: TableRow, columnID: string) => {
        return get(transaction, columnID)
      },
      filter: {
        type: ColumnFilterType.Exact,
      },
    },
    {
      id: 'address.country',
      header: 'Country',
      active: true,
      render: (transaction: TableRow, columnID: string) => {
        return get(transaction, columnID)
      },
      filter: {
        type: ColumnFilterType.Exact,
      },
    },
    {
      id: 'address.postal_code',
      header: 'ZIP Code',
      active: true,
      render: (transaction: TableRow, columnID: string) => {
        return get(transaction, columnID)
      },
      filter: {
        type: ColumnFilterType.Exact,
      },
    },
    {
      id: 'active',
      header: 'Status',
      active: true,
      render: (customer: TableRow, columnID: string) => {
        return <ActiveStatus code={customer[columnID]} />
      },
      filter: {
        type: ColumnFilterType.Exact,
      },
    },
    {
      id: 'options',
      header: null,
      active: true,
      options: [
        {
          text: 'View',
          onOptionClick: (customer: TableRow) =>
            navigate(`/customers/view/${customer.id}`),
          active: (customer: TableRow) => canViewCustomer(userProfile),
        },
        {
          text: 'Edit',
          onOptionClick: (customer: TableRow) =>
            navigate(`/customers/edit/${customer.id}`),
          active: (customer: TableRow) =>
            canEditCustomer(userProfile) && customer.active === '1',
        },
        {
          text: 'Charge',
          onOptionClick: (customer: TableRow) =>
            console.log(`Charge ${customer}`),
          active: (customer: TableRow) =>
            canChargeCustomer(userProfile) && customer.active === '1',
        },
        {
          text: (customer: TableRow) =>
            customer.active === '1' ? 'Deactivate' : 'Reactivate',

          // have not moved customers to PaginatedTable due to the re-request functionality here.
          onOptionClick: (customer: TableRow) => {
            const activateFn =
              customer.active === '1' ? deactivateCustomer : activateCustomer
            activateFn(customer.id)
            getCustomers(columnFilters, {
              number: selectedPage,
              size: showCount,
            })
          },
          active: (customer: TableRow) =>
            customer.active === '1'
              ? canDeactivateCustomer(userProfile)
              : canReactivateCustomer(userProfile),
        },
      ],
    },
  ] as TableColumn[]

  return (
    <>
      <PageHeader navText={t('customers')} headerText={t('manage customers')}>
        {canCreateCustomer(userProfile) && (
          <Button
            className="mobile:max-h-[50px] mobile:self-center"
            onClick={() => navigate('/customers/new')}
          >
            {t('add new customer')}
          </Button>
        )}
      </PageHeader>
      <ReportTable
        filters={columnFilters}
        onFilterChanged={setColumnFilters}
        tableColumns={columnDisplayOrder}
        setTableColumns={setColumnDisplayOrder}
        tableRows={customers}
        showCount={showCount}
        setShowCount={setShowCount}
        onClearFilters={() => {
          setCustomers(undefined)
          setColumnFilters({})
        }}
        activeProperty={'active'}
        filterOnActive
      />
      <div className="mt-4 mb-8">
        <Paginate
          total={totalCustomers}
          limit={showCount}
          offset={selectedPage}
          onPageChange={setSelectedPage}
        />
      </div>
    </>
  )
}

export default GetCustomers
