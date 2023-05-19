import { endent, property } from '@dword-design/functions'
import axios from 'axios'
import { execa, execaCommand } from 'execa'
import fs from 'fs-extra'
import { JSDOM } from 'jsdom'
import ora from 'ora'
import P from 'path'
import kill from 'tree-kill-promise'
import withLocalTmpDir from 'with-local-tmp-dir'

import self from './index.js'

export default {
  async afterEach() {
    await this.resetWithLocalTmpDir()
  },
  before: async () => {
    const spinner = ora('Installing Nuxt 2').start()
    await fs.outputFile(
      P.join('node_modules', '.cache', 'nuxt2', 'package.json'),
      JSON.stringify({}),
    )
    await execaCommand('yarn add nuxt@^2', {
      cwd: P.join('node_modules', '.cache', 'nuxt2'),
    })
    spinner.stop()
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
  nuxt2: async () => {
    await fs.outputFile(
      P.join('pages', 'index.vue'),
      endent`
        <template>
          <div class="foo" />
        </template>
      `,
    )
    await fs.symlink(
      P.join('..', 'node_modules', '.cache', 'nuxt2', 'node_modules'),
      'node_modules',
    )

    const nuxt = execa(P.join('node_modules', '.bin', 'nuxt'), ['dev'])
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
