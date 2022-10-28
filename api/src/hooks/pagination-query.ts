import { NextFunction } from '@feathersjs/feathers'

import { HookContext } from '../declarations'

export const paginationQuery =
  () => async (context: HookContext, next: NextFunction) => {
    const { page } = context.params.query || {}

    if (page) {
      context.params.query.page = JSON.stringify(page)
    }

    await next()
  }
