import { delay } from '@dword-design/functions'
import { loadNuxtConfig } from '@nuxt/kit'
import axios from 'axios'
import portReady from 'port-ready'

export default async () => {
  const config = await loadNuxtConfig()
  // See https://github.com/nuxt/nuxt/blob/main/packages/test-utils/src/server.ts#L30
  await portReady(config.devServer.port)
  for (let i = 0; i < 50; i += 1) {
    try {
      await delay(100)

      const result = await axios.get(config.devServer.url)
      if (
        !result.data.includes('__NUXT_LOADING__') &&
        !result.data.includes('id="nuxt_loading_screen"')
      ) {
        return
      }
    } catch {
      // continue
    }
  }
}
