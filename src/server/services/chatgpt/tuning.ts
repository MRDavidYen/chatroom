import { openaiService } from 'src/server/utilities/chatgpt'
import { FineTuningPair } from 'src/typing/chatgpt'
import * as fs from 'fs'
import * as path from 'path'
import fetch from 'node-fetch'
import FormData from 'form-data'

const createFineTuningFile = async (pairs: FineTuningPair[]) => {
  const filePath = path.join(__dirname, `${Date.now().toString()}.jsonl`)
  const writeStream = fs.createWriteStream(filePath)

  pairs.forEach((pair) => {
    writeStream.write(JSON.stringify(pair) + '\n')
  })

  writeStream.end()

  writeStream.on('finish', async () => {
    const readStream = fs.createReadStream(filePath)

    readStream.on('error', (err) => {
      console.error('Error reading file:', err)
    })

    readStream.on('data', (chunk) => {
      console.log('Reading chunk:', chunk)
    })

    const response = await openaiService.createFile(
      readStream as any,
      'fine-tune'
    )

    // console.log(response.data)
  })
}

export { createFineTuningFile }
