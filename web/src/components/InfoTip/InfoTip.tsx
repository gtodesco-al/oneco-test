import { InformationCircleIcon } from '@heroicons/react/outline'
import classNames from 'classnames'

interface InfoTipProps {
  text: string
  className?: string
}

export const InfoTip = ({ text, className = 'w-[12.5rem]' }: InfoTipProps) => (
  <div
    className="group relative inline-flex mobile:flex-col items-center justify-center"
    aria-label={text}
  >
    <InformationCircleIcon
      className="text-gray-400 w-[0.833rem] h-[0.833rem] mr-1 mobile:mr-0"
      aria-hidden
    />

    <div
      className={classNames(
        'hidden group-hover:block cursor-default absolute left-full mobile:left-auto mobile:top-full bg-gray-600 text-white text-xs rounded-md p-2 z-50',
        className
      )}
      aria-hidden
    >
      {text}
    </div>
  </div>
)

export default InfoTip
