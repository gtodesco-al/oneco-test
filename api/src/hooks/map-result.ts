import { NextFunction } from '@feathersjs/feathers'

import { HookContext } from '../declarations'

export const mapResult =
  () => async (context: HookContext, next: NextFunction) => {
    await next()

    if (context.method === 'find') {
      context.result =
        context.params.paginate === true ? context.result : context.result.list
    } else if (context.method !== 'remove') {
      context.result = context.result.data
    }
  }
