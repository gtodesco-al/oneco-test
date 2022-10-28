import { render, screen } from '@testing-library/preact'

import Notification from './Notification'

describe('Notification', () => {
  const content = 'Button'
  const { getByText } = screen

  it('Renders the notification', () => {
    render(<Notification>{content}</Notification>)

    expect(getByText(content)).toBeInTheDocument()
  })

  it('Renders with icon', () => {
    const el = render(<Notification type="error">{content}</Notification>)

    expect(el.container.innerHTML.includes('text-red-500'))
  })

  it('Hides after timeout', async () => {
    render(
      <div>
        <Notification timeout={100}>{content}</Notification>
      </div>
    )

    await new Promise<void>((resolve) => setTimeout(() => resolve(), 150))

    expect(() => getByText(content)).toThrow
  })
})
