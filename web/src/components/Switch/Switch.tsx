import { Switch as HeadlessSwitch } from '@headlessui/react'

export type SwitchProps = {
  active?: boolean
  handleChange?: (state: boolean) => void
}

const Switch = ({ active = false, handleChange }: SwitchProps) => {
  return (
    <HeadlessSwitch
      checked={active}
      onChange={(checked: boolean) => handleChange && handleChange(checked)}
      className={`${
        active ? 'bg-primary-color' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Show/Hide content</span>
      <span
        role="button"
        className={`${
          active ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white`}
      />
    </HeadlessSwitch>
  )
}

export default Switch
