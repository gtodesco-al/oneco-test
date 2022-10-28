import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from '@heroicons/react/solid'
import classNames from 'classnames'
import Button from '../Button/Button'

interface ButtonFilterProps {
  options: string[]
  selectedOption: string
  onSelect: (option: string) => void
}

/**
 * Used to provide consistent button-based filter selection on desktop and mobile layouts.
 */
export function ButtonFilterSet({
  options,
  selectedOption,
  onSelect,
}: ButtonFilterProps) {
  return (
    <>
      <div className="flex text-gray-500 text-sm mobile:hidden">
        {options.map((option) => (
          <button
            key={option}
            className={classNames('py-2 px-3 rounded-md mr-4', {
              'bg-sky-100 text-gray-900 font-medium text-sm':
                selectedOption === option,
            })}
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="hidden mobile:flex items-center justify-between">
        <Button
          buttonType="outline"
          className="w-10 h-10 p-3 rounded-full text-blue-700"
          circular
          icon={<ArrowNarrowLeftIcon />}
          aria-label="previous filter"
          disabled={selectedOption === options.at(0)}
          onClick={() =>
            onSelect(
              options.at(options.indexOf(selectedOption) - 1) ?? options[0]
            )
          }
        />

        <span className="text-sm font-medium">{selectedOption}</span>

        <Button
          buttonType="outline"
          className="w-10 h-10 p-3 rounded-full text-blue-700"
          circular
          icon={<ArrowNarrowRightIcon />}
          aria-label="next filter"
          disabled={selectedOption === options.at(-1)}
          onClick={() =>
            onSelect(
              options.at(options.indexOf(selectedOption) + 1) ?? options[0]
            )
          }
        />
      </div>
    </>
  )
}

export default ButtonFilterSet
