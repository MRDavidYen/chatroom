import { ChatCompletionRequestMessage } from 'openai'
import { fetchWithBody } from '.'

const saveCompletionApi = async (data: ChatCompletionRequestMessage[]) => {
  return fetchWithBody('/api/completion/save', data)
}

export { saveCompletionApi }
