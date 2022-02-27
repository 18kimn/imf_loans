import { resolve } from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import visualizer from "rollup-plugin-visualizer"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: { alias: { vue: "vue/dist/vue.esm-bundler.js" } },
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          filename: resolve(__dirname, "dist/stats.html"),
        }),
      ],
    },
  },
})
