import { ChatMessage } from 'src/client/components/chatroom'

type ChatModelDocument = {
  id: string
  createDate: FirebaseFirestore.Timestamp
  tuningBy: ChatMessage[]
}

export { ChatModelDocument }
