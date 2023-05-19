import { endent, property } from '@dword-design/functions'
import axios from 'axios'
import { execaCommand } from 'execa'
import fs from 'fs-extra'
import { JSDOM } from 'jsdom'
import P from 'path'
import kill from 'tree-kill-promise'
import withLocalTmpDir from 'with-local-tmp-dir'

import self from './index.js'

export default {
  async afterEach() {
    await this.resetWithLocalTmpDir()
  },
  async beforeEach() {
    this.resetWithLocalTmpDir = await withLocalTmpDir()
  },
  config: async () => {
    await fs.outputFile(
      P.join('pages', 'index.vue'),
      endent`
        <template>
          <div class="foo" />
        </template>
      `,
    )
    await fs.outputFile(
      'nuxt.config.js',
      endent`
        export default {
          devServer: {
            port: 4000,
          },
        }
      `,
    )

    const nuxt = execaCommand('nuxt dev')
    try {
      await self()

      const dom = new JSDOM(
        (await axios.get('http://localhost:4000')) |> await |> property('data'),
      )
      expect(dom.window.document.querySelectorAll('.foo').length).toEqual(1)
    } finally {
      await kill(nuxt.pid)
    }
  },
  default: async () => {
    await fs.outputFile(
      P.join('pages', 'index.vue'),
      endent`
        <template>
          <div class="foo" />
        </template>
      `,
    )

    const nuxt = execaCommand('nuxt dev')
    try {
      await self()

      const dom = new JSDOM(
        (await axios.get('http://localhost:3000')) |> await |> property('data'),
      )
      expect(dom.window.document.querySelectorAll('.foo').length).toEqual(1)
    } finally {
      await kill(nuxt.pid)
    }
  },
  'port option': async () => {
    await fs.outputFile(
      P.join('pages', 'index.vue'),
      endent`
        <template>
          <div class="foo" />
        </template>
      `,
    )

    const nuxt = execaCommand('nuxt dev', { env: { PORT: 4000 } })
    try {
      await self({ port: 4000 })

      const dom = new JSDOM(
        (await axios.get('http://localhost:4000')) |> await |> property('data'),
      )
      expect(dom.window.document.querySelectorAll('.foo').length).toEqual(1)
    } finally {
      await kill(nuxt.pid)
    }
  },
}
