import { fireEvent, render, screen } from '@testing-library/preact'
import React from 'react'

import Button from './Button'

describe('Button', () => {
  const onClickFn = jest.fn()
  const childrenButton = 'Button'
  const { getByText, getByRole } = screen

  describe('Primary Button', () => {
    beforeEach(() => {
      render(<Button onClick={onClickFn}>{childrenButton}</Button>)
    })

    it('should be able to render default button', () => {
      expect(getByText(childrenButton)).toBeInTheDocument()
      expect(getByRole('button')).toHaveClass('bg-primary-color')
    })

    it('should be able to click on the button', () => {
      fireEvent.click(getByRole('button'))
      expect(onClickFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('Outline Button', () => {
    beforeEach(() => {
      render(
        <Button buttonType="outline" isEnabled>
          {childrenButton}
        </Button>
      )
    })

    it('should be able to render outline button', () => {
      expect(getByRole('button')).not.toHaveClass('bg-gray-50')
    })

    it('should be able to render outline button with `isEnabled` true', () => {
      expect(getByRole('button')).toHaveClass('bg-gray-100')
    })
  })

  describe('Outline Button with Hover', () => {
    it('should be able to hover the button', () => {
      render(<Button buttonType="outline">{childrenButton}</Button>)

      const buttonElement = getByRole('button')

      fireEvent.mouseOver(buttonElement)
      expect(buttonElement).toHaveClass('hover:bg-gray-100')
    })
  })
})
