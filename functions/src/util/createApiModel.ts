import { mapObjIndexed } from 'ramda'

export const createApiModel = mapObjIndexed((namespaceModel, namespace) =>
  mapObjIndexed(
    (_f, procedure) => ({
      // if needed: add request init options
      // for {procedure} in {namespace}
    }),
    namespaceModel
  )
)
