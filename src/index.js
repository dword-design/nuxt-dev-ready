import { loadNuxtConfig } from '@nuxt/kit'
import axios from 'axios'
import pWaitFor from 'p-wait-for'
import portReady from 'port-ready'

export default async (options = {}) => {
  const config = await loadNuxtConfig()
  config.devServer.port = options.port || config.devServer.port
  // See https://github.com/nuxt/nuxt/blob/main/packages/test-utils/src/server.ts#L30
  await portReady(config.devServer.port)
  await pWaitFor(
    async () => {
      try {
        const result = await axios.get(
          `http://localhost:${config.devServer.port}`,
        )
        if (
          !result.data.includes('__NUXT_LOADING__') &&
          !result.data.includes('id="nuxt_loading_screen"')
        ) {
          return true
        }
      } catch (error) {
        return error.response.status !== 503
      }

      return false
    },
    { interval: 100 },
  )
}
