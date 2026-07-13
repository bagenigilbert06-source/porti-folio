# Dev Gilbert Portfolio

A polished full-stack developer portfolio built with React and an Express contact API.

## Local development

```bash
pnpm install
pnpm start
```

Run `pnpm server` in a second terminal. The React dev server proxies `/api` to port 5000.

For production:

```bash
pnpm build
pnpm serve
```

Contact submissions are validated and stored in `data/messages.json` (ignored by Git). Before publishing, replace the clearly marked placeholder email and social URLs in `src/App.js`. A public deployment should connect the handler to an email service or managed database for durable storage.
