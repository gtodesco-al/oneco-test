import { ComponentMeta, ComponentStory } from '@storybook/react'
import Paginate from './Paginate'

export default {
  component: Paginate,
  argTypes: {
    onChange: { action: true },
  },
} as ComponentMeta<typeof Paginate>

const Template: ComponentStory<typeof Paginate> = ({ ...rest }) => (
  <div className="w-[40rem]">
    <Paginate {...rest} />
  </div>
)

export const Default: ComponentStory<typeof Paginate> = Template.bind({})
Default.args = {
  total: 400,
  limit: 20,
  offset: 1,
  onPageChange: (p) => console.log(p),
}
