import {
  Application as FeathersApplication,
  HookContext as FeathersHookContext,
  Params,
} from '@feathersjs/feathers'
import { Handler } from '@feathersjs/rest-client'

export type AppHeaders = {
  'developer-id'?: string
  'user-id'?: string
  'user-api-key'?: string
}

export interface Configuration {
  apiDomain: string
  authentication: Promise<any>
  connection: ReturnType<Handler<any>>
  headers: AppHeaders
}

export interface Page<T> {
  type: string
  list: T[]
  links: {
    type: string
    first: string
    next: string
    last: string
  }
  pagination: {
    type: string
    total_count: number
    page_count: number
    page_number: number
    page_size: number
  }
  sort: {
    type: string
    fields: any[]
  }
  columns?: string[]
}

export interface ApiQuery {
  page?: {
    number?: number
    size?: number
  }
  sort?: {
    [key: string]: string
  }
  [key: string]: any
}

export interface ApiServiceParams extends Params<ApiQuery> {}

export interface ApiService<T, D = T, P = ApiServiceParams> {
  find(params?: P): Promise<T[]>
  find(params: P & { paginate: true }): Promise<Page<T>>
  get(id: string, params?: P): Promise<T>
  create(data: D, params?: P): Promise<T>
  patch(id: string, data: D, params?: P): Promise<T>
  remove(id: string, params?: P): Promise<null>
}

// eslint-disable-next-line
export interface ServiceTypes {}

export type Application = FeathersApplication<ServiceTypes, Configuration>

export type HookContext = FeathersHookContext<Application>
