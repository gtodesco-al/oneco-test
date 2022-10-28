import { ComponentMeta, Story } from '@storybook/react'
import DraggableItemList, { DraggableItemListProps } from './DraggableItemList'

export default {
  title: 'Draggable Item List',
  component: DraggableItemList,
} as ComponentMeta<typeof DraggableItemList>

const Template: Story<DraggableItemListProps> = ({ ...rest }) => (
  <div className="bg-gray-100">
    <DraggableItemList {...rest} />
  </div>
)

export const Default: Story<DraggableItemListProps> = Template.bind({})
Default.args = {
  onListChanged: (items) => console.log(items),
  items: [
    {
      id: '1',
      header: 'Live Transactions',
      description: 'Transactions that have been approved but not yet settled.',
      active: true,
    },
    {
      id: '2',
      header: 'Settled Transactions',
      description: 'Transactions that have been approved and settled.',
      active: false,
    },
    {
      id: '3',
      header: 'Transaction Volume Forecast',
      description:
        'Forecast is calculated based on the Recurring billing set up in the system.',
      active: false,
    },
    {
      id: '4',
      header: 'Recurring Billing Declines',
      description: 'Displays the outstanding Recurring Billing Declines.',
      active: false,
    },
    {
      id: '5',
      header: 'Chargebacks',
      description:
        'Displays the numbers of chargebacks received today, and the total number of unresolved chargebacks.',
      active: false,
    },
    {
      id: '6',
      header: 'ACH Rejects',
      description:
        'Number of rejected ACH transactions received today and in the past 7 days.',
      active: false,
      locked: true,
    },
  ],
}
