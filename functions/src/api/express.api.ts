import express from 'express'
import { forEachObjIndexed } from 'ramda'
import admin from 'firebase-admin'
import { createApiModel } from '../util/createApiModel'
import api from './api'

const apiModel = createApiModel(api)
const asyncCall = async (f: Function) => f()

async function getContext(
  req: express.Request,
  res: express.Response
): Promise<Context> {
  return {
    req,
    res,
    auth: null,
  }
}

export type Context = {
  req: express.Request
  res: express.Response
  auth: admin.auth.DecodedIdToken | null
}

function createExpressApi() {
  const expressApi = express()

  expressApi.get('/', (_, res) => res.json(apiModel))

  forEachObjIndexed((endpoints, namespace) => {
    const router = express.Router()

    expressApi.use(`/${namespace}`, router)

    forEachObjIndexed((fun: Function, endpoint) => {
      router.get('/', (_req, res) => res.json(Object.keys(endpoints)))
      router.all(`/${endpoint}`, async (req, res) => {
        const args = req.method === 'GET' ? [req.query] : JSON.parse(req.body)
        const context = await getContext(req, res)
        await asyncCall(() => fun.apply(context, args))
          .then(
            (ok) => {
              return { ok }
            },
            (error) => {
              return { error: error.toString() }
            }
          )
          .then((data) =>
            res
              .header('x-api-version', process.env.VUE_APP_SHORT_SHA)
              .json(data)
          )
      })
    }, endpoints)
  }, api)

  return expressApi
}

export default express().use('/api', createExpressApi())
