import { ComponentMeta, ComponentStory } from '@storybook/react'
import { InfoList } from './InfoList'

export default {
  component: InfoList,
} as ComponentMeta<typeof InfoList>

export const Default: ComponentStory<typeof InfoList> = () => (
  <InfoList>
    <InfoList.Item title="Full Width" fullWidth>
      This content takes the full width
    </InfoList.Item>
    <InfoList.Item title="Item 1">12345</InfoList.Item>
    <InfoList.Item title="Item 2">54321</InfoList.Item>
    <InfoList.Item title="Item 3">12345</InfoList.Item>
    <InfoList.Item title="Item 4">54321</InfoList.Item>
  </InfoList>
)
