import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import zipPack from 'vite-plugin-zip-pack'
import { deleteFilesWithExclusion } from './src/utils/fileUtils.js'
import { getFormattedDateForBuild } from './src/utils/dateUtils.js'
import path from 'path'

const formattedDate = getFormattedDateForBuild()
const zipFileName = `TemplateViteVue_${formattedDate}.zip`
const buildDirectory = 'dist'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    zipPack({
      outDir: buildDirectory,
      outFileName: zipFileName,
      done: () => {
        deleteFilesWithExclusion(buildDirectory, zipFileName)
      }
    })
  ],
  server: {
    open: true
  },
  resolve: {
    alias: {
      '@utils': path.resolve('src/utils')
    }
  }
})
