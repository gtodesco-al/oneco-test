import { Link as LinkDOM, LinkProps as RouterLinkProps } from 'react-router-dom'
import classNames from 'classnames'

export type LinkProps = {
  isExternalLink?: boolean
  text: string
} & RouterLinkProps

export function Link({
  isExternalLink = false,
  text,
  className,
  ...rest
}: LinkProps) {
  const stylesLink = classNames(
    'font-semibold text-sm underline underline-offset-2 text-primary-color',
    className
  )

  return isExternalLink ? (
    <a className={stylesLink} href={rest.to as string} {...rest}>
      {text}
    </a>
  ) : (
    <LinkDOM className={stylesLink} {...rest}>
      {text}
    </LinkDOM>
  )
}

export default Link
