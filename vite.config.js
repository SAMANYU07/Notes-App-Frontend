import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": "http://localhost:3000/"
//     }
//   }
// })


export default ({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig ({
    plugins: [react()],
    server: {
      proxy: {
        "/api": process.env.VITE_BACKEND_URI,
      },
    }
  })
}