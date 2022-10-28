import { ComponentMeta, Story } from '@storybook/react'
import DraggableItem from './DraggableItem'
import { DraggableItemListItem } from '../DraggableItemList'

export default {
  title: 'Draggable Item',
  component: DraggableItem,
} as ComponentMeta<typeof DraggableItem>

const Template: Story<DraggableItemListItem> = (item) => (
  <div className="bg-gray-100">
    <DraggableItem
      item={item}
      onActiveChanged={(state: boolean) => {
        console.log(state)
      }}
    />
  </div>
)

export const Default: Story<DraggableItemListItem> = Template.bind({})
Default.args = {
  id: '1',
  header: 'Live transactions',
  description: 'Transactions that have been approved but not yet settled.',
  active: true,
}
