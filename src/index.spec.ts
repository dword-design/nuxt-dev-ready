import pathLib from 'node:path';

import { expect, test } from '@playwright/test';
import axios from 'axios';
import endent from 'endent';
import { execaCommand } from 'execa';
import fs from 'fs-extra';
import getPort from 'get-port';
import { JSDOM } from 'jsdom';
import kill from 'tree-kill-promise';

import self from '.';

test('works', async ({}, testInfo) => {
  const cwd = testInfo.outputPath();

  await fs.outputFile(
    pathLib.join(cwd, 'pages', 'index.vue'),
    endent`
      <template>
        <div class="foo" />
      </template>
    `,
  );

  const port = await getPort();

  const nuxt = execaCommand('nuxt dev', {
    cwd,
    env: { PORT: String(port) },
    reject: false,
    stderr: 'inherit',
  });

  try {
    await self(port);
    const { data } = await axios.get(`http://localhost:${port}`);
    const dom = new JSDOM(data);
    expect(dom.window.document.querySelectorAll('.foo').length).toEqual(1);
  } finally {
    await kill(nuxt.pid!);
  }
});
