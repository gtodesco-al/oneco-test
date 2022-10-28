import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { BaseDashboardWidget } from './BaseDashboardWidget'

export default {
  title: 'BaseDashboardWidget',
  component: BaseDashboardWidget,
} as ComponentMeta<typeof BaseDashboardWidget>

const Template: ComponentStory<typeof BaseDashboardWidget> = (args) => (
  <BrowserRouter>
    <BaseDashboardWidget {...args}>
      <p>Test Child 1</p>
      <p>Test Child 2</p>
    </BaseDashboardWidget>
  </BrowserRouter>
)

export const WithChildren = Template.bind({})
WithChildren.args = {
  name: 'Test Name',
  description: 'Test Description',
}

export const NoTransactions = WithChildren.bind({})
NoTransactions.args = {
  ...WithChildren.args,
  hasTransactions: false,
}

export const HalfWidth: ComponentStory<typeof BaseDashboardWidget> = (args) => (
  <BrowserRouter>
    <div className="w-[34rem]">
      <BaseDashboardWidget {...args}>
        <p>Test Child 1</p>
        <p>Test Child 2</p>
      </BaseDashboardWidget>
    </div>
  </BrowserRouter>
)

HalfWidth.args = {
  ...WithChildren.args,
  halfWidth: true,
}

export const HalfWidthNoTransactions: ComponentStory<
  typeof BaseDashboardWidget
> = HalfWidth.bind({})
HalfWidthNoTransactions.args = {
  ...HalfWidth.args,
  hasTransactions: false,
}
