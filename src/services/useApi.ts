import { Api, ApiModel } from '../../functions/src/api/api'
import { mapObjIndexed } from 'ramda'



const modelToFetchApi = (mapObjIndexed((namespaceModel, namespace) =>
  mapObjIndexed(
    (options: Object, procedure) => (...args: any[]) => {
      console.log('=> ', args)
      return request(`${namespace}/${procedure}`, {
        body: JSON.stringify(args),
      })
        .then((response) => {
          console.log('<=', response)
          return response
        })
        .then(({ ok, error }) => {
          if (error) {
            throw error
          }
          return ok
        })
    },
    namespaceModel,
  ),
) as unknown) as (apiModel: ApiModel) => Api





const request = (url: string, req?: RequestInit) =>
  fetch(`api/${url}`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    referrerPolicy: 'no-referrer-when-downgrade',
    ...req,
  }).then((fetchResponse) => {
    if (fetchResponse.ok) {
      return fetchResponse.json()
    }
    throw new Error(fetchResponse.statusText)
  })


const loadApi = (): Promise<Api> =>
request('/', { method: 'GET' }).then(modelToFetchApi)

let apiPromise: null | Promise<Api> = null

export const useApi = <T>(cb: (api: Api) => T | Promise<T>): Promise<T> =>
(apiPromise ||= loadApi()).then(cb)

