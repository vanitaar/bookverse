import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ command }) => {
  if (command === "build") {
    process.env.NODE_ENV = "production";
  }

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": "http://localhost:3000",
      },
    },
  };
});
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": "http://localhost:3000",
//     },
//   },
// });
