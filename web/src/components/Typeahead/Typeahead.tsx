import { Combobox } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'
import classNames from 'classnames'

import { debounce } from 'lodash'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { FieldLabelClasses } from '../FieldLabel/FieldLabel'

interface TypeaheadProps<T> {
  label: string

  /**
   * Provides a label for the clear button, used for screen readers.
   * This label is required as it should indicate what it's clearing (ie. "Clear Routing Number") and be localized.
   */
  ariaClearLabel: string

  placeholder?: string

  /**
   * If the source is an array, will be filtered by typed values using a case-insensitive search to determine options.
   * If the source is a function, typed values will be provided to it and results will be used to determine options.
   */
  source: T[] | ((filter: string) => Promise<T[]>)

  /**
   * Provides additional options below the main list of options, ideally as Typeahead.ExtraOption elements to preserve styling
   */
  extraOptions?: ReactNode

  value: T | undefined

  /**
   * Used to determine how to display a value's name.
   * If none is provided, will call toString (if defined on the value) or JSON.stringify (if toString is undefined)
   */
  itemToString?: (value: T) => string

  onChange: (value: T | undefined) => void

  /**
   * If provided and the source is a function, will limit the maximum pace at which the source service can be invoked.
   */
  debounceMs?: number

  /**
   * If provided, will apply a cap to the amount of options that can be displayed.
   */
  maxRecordsDisplayed?: number

  /**
   * If provided, will display the icon at the left side of the typeahead field.
   */
  icon?: ReactNode
}

const defaultToString = (value: { toString?: () => string }) =>
  value.toString ? value.toString() : JSON.stringify(value)

export function Typeahead<T extends object | string>({
  label,
  ariaClearLabel,
  placeholder = '',
  source,
  extraOptions,
  value,
  onChange,
  debounceMs = 100,
  itemToString = defaultToString,
  maxRecordsDisplayed = undefined,
  icon = undefined,
}: TypeaheadProps<T>) {
  const [inputValue, setInputValue] = useState('')

  const [options, setOptions] = useState<T[]>([])

  //Debouncing prevents excessive API hits if the user is typing overly fast.
  const debouncedSource =
    typeof source === 'function'
      ? useCallback(
          debounce(
            (filter: string) =>
              source(filter).then((results) =>
                setOptions(results.slice(0, maxRecordsDisplayed ?? Infinity))
              ),
            debounceMs,
            { leading: true }
          ),
          [source, maxRecordsDisplayed]
        )
      : (filter: string) =>
          setOptions(
            source
              .filter((option) =>
                itemToString(option)
                  .toLowerCase()
                  .includes(filter.toLowerCase())
              )
              .slice(0, maxRecordsDisplayed ?? Infinity)
          )

  useEffect(() => {
    debouncedSource(inputValue)
  }, [inputValue, source])

  return (
    //Extra code here prevents nulls being passed to onChange
    <Combobox
      value={value}
      onChange={(value) => onChange(value !== null ? value : undefined)}
      as="div"
      nullable
    >
      <Combobox.Label className={FieldLabelClasses}>{label}</Combobox.Label>

      <div className="relative">
        <Combobox.Button as="div">
          <Combobox.Input
            autoComplete="off"
            className={classNames(
              'peer p-3 pb-[0.8rem] pl-[1.2rem] border border-solid border-gray-300 rounded-md bg-white w-full h-11 font-medium text-sm text-gray-900',
              {
                'pl-[1.2rem]': icon === undefined,
                'pl-10': icon !== undefined,
              }
            )}
            placeholder={placeholder}
            value={inputValue}
            displayValue={(item: T | undefined) =>
              item !== undefined ? itemToString(item) : ''
            }
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Combobox.Button>

        {icon !== undefined && (
          <div className="absolute h-full w-4 left-0 top-0 flex ml-3 text-gray-500">
            {icon}
          </div>
        )}

        {value !== undefined && (
          <div className="peer-focus:hidden">
            <div
              className={classNames(
                'absolute w-full h-full left-0 top-0 p-3 pointer-events-none',
                {
                  'pl-[2.075rem]': icon !== undefined,
                }
              )}
            >
              <div className="h-full w-full bg-sky-50 flex space-between items-center text-sm font-medium text-sky-800 pl-2">
                <span className="truncate mr-6" aria-hidden>
                  {itemToString(value)}
                </span>
              </div>
            </div>

            <button
              type="button"
              aria-label={ariaClearLabel}
              className="text-blue-400 absolute top-0 right-0 h-full px-5 flex flex-col justify-center"
              onClick={() => onChange(undefined)}
            >
              <XIcon className="text-black w-3" />
            </button>
          </div>
        )}
      </div>

      <Combobox.Options className='"absolute w-full mt-2 bg-white rounded-md text-sm shadow'>
        {options.map((item, index) => (
          <Combobox.Option
            className="first:rounded-t-md last:rounded-b-md"
            key={index}
            value={item}
          >
            {({ selected }) => (
              <div
                className={classNames(
                  'p-3 cursor-pointer hover:bg-gray-300 hover:text-gray-900',
                  {
                    'bg-gray-100': selected,
                    'text-gray-500': !selected,
                  }
                )}
              >
                {itemToString(item)}
              </div>
            )}
          </Combobox.Option>
        ))}

        {extraOptions && (
          <>
            <hr className="m-2" />

            <div className="flex flex-col">{extraOptions}</div>
          </>
        )}
      </Combobox.Options>
    </Combobox>
  )
}

interface ExtraOptionProps {
  children: ReactNode
  onClick: () => void
}

Typeahead.ExtraOption = ({ children, onClick }: ExtraOptionProps) => (
  <button
    type="button"
    className="w-full p-3 text-left text-primary-700 hover:bg-gray-300"
    onClick={onClick}
  >
    {children}
  </button>
)

export default Typeahead
