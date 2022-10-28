import { NextFunction } from '@feathersjs/feathers'
import { HookContext } from '../declarations'

export const setHeaders =
  () => async (context: HookContext, next: NextFunction) => {
    const { headers = {} } = context.params

    context.params.headers = {
      ...headers,
      ...context.app.get('headers'),
    }

    await next()
  }
