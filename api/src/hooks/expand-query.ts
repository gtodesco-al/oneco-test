import { NextFunction } from '@feathersjs/feathers'

import { HookContext } from '../declarations'

export const expandQuery =
  (...names: string[]) =>
  async (context: HookContext, next: NextFunction) => {
    const {
      params: { query = {} },
    } = context

    context.params.query = {
      ...query,
      expand: names,
    }

    await next()
  }
