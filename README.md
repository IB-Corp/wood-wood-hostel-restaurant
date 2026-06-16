# Wood Wood Landing

A minimal Vue 3 + Vite demo for the existing `WoodWoodLanding.vue` component.

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server on the local network:
   ```bash
   npm run dev
   ```
3. Find your machine's local IP address (for example `192.168.1.42`).
4. Open the LAN URL from another device on the same Wi-Fi, for example:
   ```text
   http://192.168.1.42:5173
   ```

> If your firewall blocks access, allow incoming connections for Node/Vite or temporarily disable the firewall while demoing.

## Build for production

```bash
npm run build
```

## Notes

- The app entry is `src/main.js`.
- The landing page component is `WoodWoodLanding.vue` in the project root.
- `src/App.vue` renders that component directly.
