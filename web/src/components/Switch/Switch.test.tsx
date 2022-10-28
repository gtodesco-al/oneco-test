import { render } from '@testing-library/preact'
import user from '@testing-library/user-event'

import Switch from './Switch'

describe('Switch', () => {
  interface TestProps {
    active: boolean
    handleChange: () => void
  }

  const renderSwitch = ({ handleChange, active }: TestProps) =>
    render(<Switch active={active} handleChange={handleChange} />)

  test('calls handleChange when clicked', async () => {
    const handleChange = jest.fn()
    const { getByRole } = renderSwitch({ handleChange, active: false })

    await user.click(getByRole('button'))

    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
