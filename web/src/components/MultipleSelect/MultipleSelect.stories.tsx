import { ComponentMeta, ComponentStory } from '@storybook/react'
import { MultipleSelect } from './MultipleSelect'

export default {
  title: 'MultipleSelect',
  component: MultipleSelect,
  argTypes: {
    onChangeSelections: { action: true },
  },
} as ComponentMeta<typeof MultipleSelect>

const Template: ComponentStory<typeof MultipleSelect> = (args) => (
  <div className="w-60">
    <MultipleSelect {...args} />
  </div>
)

export const NoItems = Template.bind({})
NoItems.args = {
  defaultText: 'Default Text',
  allItems: [],
  selectedItems: [],
}

export const NoSelections = Template.bind({})
NoSelections.args = {
  ...NoItems.args,
  allItems: ['Item one', 'Item two', 'Item three'],
}

export const OneSelection = Template.bind({})
OneSelection.args = {
  ...NoSelections.args,
  selectedItems: ['Item two'],
}

export const MultipleSelections = Template.bind({})
MultipleSelections.args = {
  ...NoSelections.args,
  selectedItems: ['Item two', 'Item three'],
}

export const WithObjects = Template.bind({})
WithObjects.args = {
  allItems: [{ name: 'Item 1' }, { name: 'Item 2' }],
  selectedItems: [],
  itemToString: (item: unknown) => (item as { name: string }).name,
}
