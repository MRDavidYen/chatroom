import { openaiService } from 'src/server/utilities/chatgpt'
import { FineTuningPair } from 'src/typing/chatgpt'
import * as fs from 'fs'
import * as path from 'path'
import {
  saveTuningFile,
  TuningFileDocument,
} from 'src/server/persistants/firestore/models'
import { ChatMessage } from 'src/client/components/chatroom'
import { CreateFineTuneRequest } from 'openai'

const convertEveryTwoChatMessageToFineTuningPair = (message: ChatMessage[]) => {
  const pairs: FineTuningPair[] = []

  for (let i = 0; i < message.length; i += 2) {
    const pair = {
      prompt: message[i].message,
      completion: message[i + 1].message,
    } as FineTuningPair

    pairs.push(pair)
  }

  return pairs
}

const createFineTuning = async (tuningFile: TuningFileDocument) => {
  return await openaiService.createFineTune({
    training_file: tuningFile.id,
    model: 'text-davinci-003',
  })
}

const createFineTuningFile = async (
  pairs: FineTuningPair[],
  fileName?: string
) => {
  const filePath = path.join(
    __dirname,
    `${fileName ?? Date.now().toString()}.jsonl`
  )
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

    console.log(response.data)

    saveTuningFile(response.data)

    return Promise.resolve()
  })
}

export {
  createFineTuningFile,
  createFineTuning,
  convertEveryTwoChatMessageToFineTuningPair,
}
