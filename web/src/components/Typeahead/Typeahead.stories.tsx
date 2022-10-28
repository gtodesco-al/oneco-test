import { SearchIcon } from '@heroicons/react/outline'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Typeahead from './Typeahead'

export default {
  component: Typeahead,
  argTypes: {
    onChange: { action: true },
  },
} as ComponentMeta<typeof Typeahead>

export const Default: ComponentStory<typeof Typeahead> = (args) => (
  <div className="w-80">
    <Typeahead {...args} />
  </div>
)

const testSource = [
  {
    name: 'Test Name 1',
    value: '1',
  },
  {
    name: 'Test 2',
    value: '2',
  },
  {
    name: 'Third option',
    value: '3',
  },
]

Default.args = {
  label: 'Test Label',
  placeholder: 'Placeholder Text',
  itemToString: (item) => (item as { name: string }).name,
  source: testSource,
  value: undefined,
}

export const WithSelectedValue = Default.bind({})

WithSelectedValue.args = {
  ...Default.args,
  value: testSource[0],
}

export const withSlowSource = Default.bind({})

withSlowSource.args = {
  ...Default.args,
  source: (value) =>
    new Promise((resolve) =>
      setTimeout(() => {
        resolve(
          testSource.filter((t) =>
            t.name.toLowerCase().includes(value.toLowerCase())
          )
        )
      }, 100)
    ),
}

export const WithLongString = Default.bind({})

WithLongString.args = {
  ...WithSelectedValue.args,
  itemToString: () =>
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
}

export const WithIcon = Default.bind({})
WithIcon.args = {
  ...Default.args,
  icon: <SearchIcon />,
}

export const IconAndValue = Default.bind({})
IconAndValue.args = {
  ...WithIcon.args,
  ...WithSelectedValue.args,
}

export const WithExtraOptions = Default.bind({})
WithExtraOptions.args = {
  ...Default.args,
  extraOptions: (
    <>
      <Typeahead.ExtraOption onClick={() => undefined}>
        Option 1
      </Typeahead.ExtraOption>
      <Typeahead.ExtraOption onClick={() => undefined}>
        Option 2
      </Typeahead.ExtraOption>
    </>
  ),
}
