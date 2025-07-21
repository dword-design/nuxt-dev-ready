<!-- TITLE/ -->
# nuxt-dev-ready
<!-- /TITLE -->

<!-- BADGES/ -->
<p>
  <a href="https://npmjs.org/package/nuxt-dev-ready">
    <img
      src="https://img.shields.io/npm/v/nuxt-dev-ready.svg"
      alt="npm version"
    >
  </a><img src="https://img.shields.io/badge/os-linux%20%7C%C2%A0macos%20%7C%C2%A0windows-blue" alt="Linux macOS Windows compatible"><a href="https://github.com/dword-design/nuxt-dev-ready/actions">
    <img
      src="https://github.com/dword-design/nuxt-dev-ready/workflows/build/badge.svg"
      alt="Build status"
    >
  </a><a href="https://codecov.io/gh/dword-design/nuxt-dev-ready">
    <img
      src="https://codecov.io/gh/dword-design/nuxt-dev-ready/branch/master/graph/badge.svg"
      alt="Coverage status"
    >
  </a><a href="https://david-dm.org/dword-design/nuxt-dev-ready">
    <img src="https://img.shields.io/david/dword-design/nuxt-dev-ready" alt="Dependency status">
  </a><img src="https://img.shields.io/badge/renovate-enabled-brightgreen" alt="Renovate enabled"><br/><a href="https://gitpod.io/#https://github.com/dword-design/nuxt-dev-ready">
    <img
      src="https://gitpod.io/button/open-in-gitpod.svg"
      alt="Open in Gitpod"
      width="114"
    >
  </a><a href="https://www.buymeacoffee.com/dword">
    <img
      src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg"
      alt="Buy Me a Coffee"
      width="114"
    >
  </a><a href="https://paypal.me/SebastianLandwehr">
    <img
      src="https://sebastianlandwehr.com/images/paypal.svg"
      alt="PayPal"
      width="163"
    >
  </a><a href="https://www.patreon.com/dworddesign">
    <img
      src="https://sebastianlandwehr.com/images/patreon.svg"
      alt="Patreon"
      width="163"
    >
  </a>
</p>
<!-- /BADGES -->

<!-- DESCRIPTION/ -->
Waits until the Nuxt dev server is loaded. Mainly useful for testing.
<!-- /DESCRIPTION -->

<!-- INSTALL/ -->
## Install

```bash
# npm
$ npm install nuxt-dev-ready

# Yarn
$ yarn add nuxt-dev-ready
```
<!-- /INSTALL -->

## Usage

```js
import { execaCommand } from 'execa';
import kill from 'tree-kill-promise';
import nuxtDevReady from 'nuxt-dev-ready';

const nuxt = execaCommand('nuxt dev');

try {
  await nuxtDevReady();

  // Do some testing
} finally {
  await kill(nuxt.pid);
} 
```

## Custom port

You can pass a custom port to `nuxtDevReady` like so:

```js
import { execaCommand } from 'execa';
import kill from 'tree-kill-promise';
import nuxtDevReady from 'nuxt-dev-ready';

const nuxt = execaCommand('nuxt dev', { env: { PORT: 4000 } });

try {
  await nuxtDevReady(4000);
} finally {
  await kill(nuxt.pid);
} 
```

<!-- LICENSE/ -->
## Contribute

Are you missing something or want to contribute? Feel free to file an [issue](https://github.com/dword-design/nuxt-dev-ready/issues) or a [pull request](https://github.com/dword-design/nuxt-dev-ready/pulls)! ⚙️

## Support

Hey, I am Sebastian Landwehr, a freelance web developer, and I love developing web apps and open source packages. If you want to support me so that I can keep packages up to date and build more helpful tools, you can donate here:

<p>
  <a href="https://www.buymeacoffee.com/dword">
    <img
      src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg"
      alt="Buy Me a Coffee"
      width="114"
    >
  </a>&nbsp;If you want to send me a one time donation. The coffee is pretty good 😊.<br/>
  <a href="https://paypal.me/SebastianLandwehr">
    <img
      src="https://sebastianlandwehr.com/images/paypal.svg"
      alt="PayPal"
      width="163"
    >
  </a>&nbsp;Also for one time donations if you like PayPal.<br/>
  <a href="https://www.patreon.com/dworddesign">
    <img
      src="https://sebastianlandwehr.com/images/patreon.svg"
      alt="Patreon"
      width="163"
    >
  </a>&nbsp;Here you can support me regularly, which is great so I can steadily work on projects.
</p>

Thanks a lot for your support! ❤️

## License

[MIT License](https://opensource.org/license/mit/) © [Sebastian Landwehr](https://sebastianlandwehr.com)
<!-- /LICENSE -->
