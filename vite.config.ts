import del from 'rollup-plugin-delete'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path'

const alias = {
  '@': resolve(__dirname, './src'),
  '@playground': resolve(__dirname, './playground'),
  '@root': resolve(__dirname, './')
}

const playgroundConfig = {
  plugins: [vue()],
  resolve: { alias },
  build: { outDir: 'dist-playground' },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@playground/scss/variables";`
      }
    }
  }
}

const libConfig = {
  plugins: [
    del({ targets: 'dist/favicon.ico', hook: 'writeBundle' }),
    vue(),
    // https://github.com/qmhc/vite-plugin-dts#options
    dts({
      exclude: ['playground/**'],
      beforeWriteFile: function (filePath, content) {
        // Write definition files in /dist/types/ instead of /dist/src/
        const finalFilePath = filePath.replace('/dist/src/', '/dist/types/')

        return { filePath: finalFilePath, content }
      }
    })
  ],
  resolve: { alias },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/SearchInput.vue'),
      name: 'VueSearchInput',
      fileName: (format) => `vue-search-input.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
}

const config = process.env.BUILD_MODE && process.env.BUILD_MODE === 'playground' ? playgroundConfig : libConfig

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return playgroundConfig
  } else {
    return config
  }
})
