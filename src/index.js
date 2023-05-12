import { loadNuxtConfig } from '@nuxt/kit'
import axios from 'axios'
import pWaitFor from 'p-wait-for'
import portReady from 'port-ready'

export default async () => {
  const config = await loadNuxtConfig()
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
