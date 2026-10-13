# React + Vite

## Contact form setup

The contact form uses [Web3Forms](https://web3forms.com/) and sends submissions
to the inbox associated with its access key. Generate an access key for
`hr160383@gmail.com`, then set `VITE_WEB3FORMS_ACCESS_KEY` in your local
environment (copy `.env.example` to `.env.local` and add the key) and in the
Vercel project's Environment
Variables for Production, Preview, and Development as needed. Redeploy after
changing the Vercel variable.

The access key is a public client-side identifier, not a server-side secret.
Web3Forms recipient verification or activation may be required before messages
can be delivered. Until a valid key is configured and delivery is tested, the
form shows an unavailable message and visitors can use the public email link.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
