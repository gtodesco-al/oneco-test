import { HookContext } from '../declarations'

/**
 * Emitted after each successful API request. This will inform the UIs
 * that the User is still active.
 */
export function refreshToken(context: HookContext) {
  const { app, error } = context
  if (!error) {
    app.emit('refreshToken', Date.now())
  }

  return context
}
