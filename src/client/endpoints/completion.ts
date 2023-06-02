import { ChatCompletionRequestMessage } from 'openai'
import { fetchWithBody } from '.'

const saveCompletionApi = async (data: ChatCompletionRequestMessage[]) => {
  return fetchWithBody('/api/completion/save', data)
}

const deleteCompletionApi = async () => {
  return fetch('/api/completion', { method: 'DELETE' })
}

export { saveCompletionApi, deleteCompletionApi }
