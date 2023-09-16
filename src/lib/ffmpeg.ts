import { FFmpeg } from '@ffmpeg/ffmpeg'

// adicionamos url no final para que ele carregue de forma assíncrona o arquivo, somente quando precisar. 
// Como se fosse uma tag script.
import coreURL from '../ffmpeg/ffmpeg-core.js?url'
import wasmURL from '../ffmpeg/ffmpeg-core.wasm?url'
import workerURL from '../ffmpeg/ffmpeg-worker.js?url'

let ffmpeg: FFmpeg | null

export const getFFmpeg = async () => {
  if (ffmpeg) {
    return ffmpeg
  }

  ffmpeg = new FFmpeg()

  if (!ffmpeg.loaded) {
    await ffmpeg.load({
      coreURL,
      wasmURL,
      workerURL
    })
  }

  return ffmpeg
}