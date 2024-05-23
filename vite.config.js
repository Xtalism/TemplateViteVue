import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import zipPack from 'vite-plugin-zip-pack'
import { deleteFilesWithExclusion } from './src/utils/fileUtils.js'
import { getFormattedDateForBuild } from './src/utils/dateUtils.js'
import path from 'path'

const formattedDate = getFormattedDateForBuild()
const zipFileName = `TemplateViteVue_${formattedDate}.zip`
const buildDirectory = 'dist'

// eslint-disable-next-line no-undef
const isDockerBuild = process.env.DOCKER_BUILD?.toLowerCase() === 'true'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    !isDockerBuild &&
      zipPack({
        outDir: buildDirectory,
        outFileName: zipFileName,
        done: (error) => {
          if (error) {
            console.error(
              'Error creating ZIP file, skipping deletion of build files'
            )
            return
          }

          deleteFilesWithExclusion(buildDirectory, zipFileName)
        }
      })
  ].filter(Boolean),
  resolve: {
    alias: {
      '@utils': path.resolve('src/utils'),
      '@pages': path.resolve('src/pages'),
      '@components': path.resolve('src/components'),
      '@router': path.resolve('src/router'),
      '@services': path.resolve('src/services')
    }
  }
})
