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
const dockerBuildEnv = process.env.DOCKER_BUILD
const isDockerBuild =
  typeof dockerBuildEnv === 'string'
    ? dockerBuildEnv.toLowerCase() === 'true'
    : false

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
  server: {
    open: true
  },
  resolve: {
    alias: {
      '@utils': path.resolve('src/utils')
    }
  }
})
