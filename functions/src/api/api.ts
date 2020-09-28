const api = {
  admin: {
    async getAllUsers(): Promise<{ email: string }[]> {
      return [{ email: 'user1@gmail.com' }]
    },
  },
  auth: {
    async getCustomToken(uid: string): Promise<string> {
      return ''
    },
  },
}

export type Api = typeof api

export type ApiModel = Record<keyof Api, { [procedure: string]: {} }>

export default api
