import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import WindiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), WindiCSS()],
  server: {
    proxy: {
      // We can configure proxy options here if needed
    },
    // Custom server options
    host: "localhost",
    port: 3000,
  },
  // build: {
  //   outDir: "dist",
  //   // other build options...
  // },
});
