import { errors, FeathersError, GeneralError } from '@feathersjs/errors'
import { HookContext } from '../declarations'

export const getErrorMessage = (error: any) => {
  const { meta } = error

  if (meta?.new_password && meta.new_password[0]) {
    return meta.new_password[0]
  }

  if (meta?.message) {
    return meta.message
  }

  return error.detail || error.title || error
}

export const convertError = (error: any) => {
  if (error instanceof FeathersError) {
    return error
  }

  const statusCode = error.statusCode
    ? error.statusCode === 412
      ? 406
      : error.statusCode
    : 500
  const ErrorClass = (errors as any)[statusCode] || GeneralError

  return new ErrorClass(getErrorMessage(error))
}

export function onError(context: HookContext) {
  const { app, error } = context

  if (error) {
    context.error = convertError(error)

    app.emit('apiError', context.error)
  }

  return context
}
