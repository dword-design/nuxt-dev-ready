import { endent, property } from '@dword-design/functions'
import axios from 'axios'
import { execaCommand } from 'execa'
import fs from 'fs-extra'
import { JSDOM } from 'jsdom'
import P from 'path'
import withLocalTmpDir from 'with-local-tmp-dir'
import kill from 'tree-kill-promise'

import self from './index.js'

export default {
  async afterEach() {
    await this.resetWithLocalTmpDir()
  },
  async beforeEach() {
    this.resetWithLocalTmpDir = await withLocalTmpDir()
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
  port: async () => {
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
      await self(4000)

      const dom = new JSDOM(
        (await axios.get('http://localhost:4000')) |> await |> property('data'),
      )
      expect(dom.window.document.querySelectorAll('.foo').length).toEqual(1)
    } finally {
      await kill(nuxt.pid)
    }
  },
}
