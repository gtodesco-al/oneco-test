import { render } from '@testing-library/preact'
import user from '@testing-library/user-event'
import VirtualTerminalSection from './VirtualTerminalSection'

describe.skip('VirtualTerminalSection', () => {
  const testHeader = 'Test Header'
  const testContents = 'Test Contents'

  const renderSection = ({
    header = testHeader,
    open = undefined,
    setOpen = () => undefined,
  }: Partial<Parameters<typeof VirtualTerminalSection>[0]> = {}) =>
    render(
      <VirtualTerminalSection header={header} open={open} setOpen={setOpen}>
        <p>{testContents}</p>
      </VirtualTerminalSection>
    )

  test('shows header', () => {
    const { getByRole } = renderSection({ header: testHeader })

    expect(getByRole('heading')).toHaveTextContent(testHeader)
  })

  test('shows content if open is undefined', () => {
    const { getByText } = renderSection({ open: undefined })

    expect(getByText(testContents)).toBeInTheDocument()
  })

  test('does not show toggle if open is undefined', () => {
    const { queryByRole } = renderSection({ open: undefined })

    expect(queryByRole('switch')).not.toBeInTheDocument()
  })

  test('calls setOpen if toggle is clicked', async () => {
    const fakeHandler = jest.fn()

    const { getByRole } = renderSection({ open: true, setOpen: fakeHandler })

    await user.click(getByRole('switch'))

    expect(fakeHandler).toHaveBeenCalled()
  })
})
