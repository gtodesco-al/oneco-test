import { ComponentMeta, ComponentStory } from '@storybook/react'
import { PageHeader } from './PageHeader'

export default {
  component: PageHeader,
} as ComponentMeta<typeof PageHeader>

export const Default: ComponentStory<typeof PageHeader> = (args) => (
  <PageHeader {...args} />
)

Default.args = {
  navText: 'Test Nav Text',
  headerText: 'test header',
  children: <button className="bg-white">Test Button</button>,
}

export const WithoutChildren = Default.bind({})
WithoutChildren.args = {
  ...Default.args,
  children: undefined,
}
