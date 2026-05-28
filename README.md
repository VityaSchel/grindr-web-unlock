# Grindr Web Unlock

![Screenshot](./contrib/screenshot.avif)

Simple browser extension/add-on to unlock web.grindr.com for free users, bypassing paywall. Presented to you by [Open Grind](https://opengrind.org) project.

> [!Note]
> Loading conversations and messages history is not possible at the moment (see issue #2).
> You can still send messages and receive new ones when opening a chat via profile page.

## Usage

To use the extension, simply install it in your browser and visit [web.grindr.com](https://web.grindr.com). No configuration is needed.

### Firefox, Firefox for Android, LibreWolf

- [Download on Firefox Add-ons](https://addons.mozilla.org/addon/grindr-web-unlock/)

### Google Chrome and other browsers

1. [Download source code](https://git.opengrind.org/open-grind/grindr-web-unlock/releases/download/v1.0.3/grindr_web_unlock-1.0.3.zip)
2. Unzip the downloaded file
3. Go to your browser's extensions page in developer mode:
   - Google Chrome: `chrome://extensions/` -> `Developer mode` toggle — enabled
   - Firefox: `about:debugging#/runtime/this-firefox`
4. Load the unpacked extension:
   - Google Chrome: `Load unpacked` -> Select the unzipped folder
   - Firefox: `Load Temporary Add-on` -> Select manifest.json in the unzipped folder

## License

[MIT](./LICENSE)
