import { fetchEventSource } from '@microsoft/fetch-event-source'
import MarkdownIt from 'markdown-it'
import { ChatCompletionRequestMessage } from 'openai'
import React, { useEffect, useRef, useState } from 'react'
import { ChatStreamingChunk } from 'src/typing/chatgpt'
import { ChatMessage } from '..'
import styles from 'src/styles/markdown.module.scss'
import hljs from 'highlight.js'
import { saveCompletionApi } from 'src/client/endpoints/completion'

const ChatItem = ({ ...props }: IChatItemProps) => {
  const messageRef = useRef<string>('')

  const [responseMessage, setResponseMessage] = useState<string>('')
  const [streamingEnded, setStreamingEnded] = useState<boolean>(false)

  const onMessageSended = (input: string) => {
    const md = new MarkdownIt({
      highlight: (str, lang) => {
        try {
          if (lang && hljs.getLanguage(lang)) {
            const preCode = hljs.highlight(lang, str, true).value

            return `<pre class="hljs"><code>${preCode}</code></pre>`
          }
        } catch {}

        return str
      },
    })

    const requestMessage: ChatCompletionRequestMessage[] = [
      {
        role: 'user',
        content: input,
      },
    ]

    fetchEventSource('/api/completion', {
      method: 'POST',
      body: JSON.stringify(requestMessage),
      headers: {
        'Content-Type': 'application/json',
      },
      signal: props.abort.signal,
      onmessage: (event) => {
        const result = JSON.parse(event.data) as ChatStreamingChunk

        for (const choice of result.choices) {
          if (choice.delta.content) {
            messageRef.current = messageRef.current + choice.delta.content

            setResponseMessage(md.render(messageRef.current))
          }
        }
      },
      onclose: () => {
        setStreamingEnded(true)
        saveCompletionApi([
          ...requestMessage,
          {
            role: 'assistant',
            content: messageRef.current,
          },
        ])
        props.onStreamingEnded!(messageRef.current)
      },
    })
  }

  const userMessage = () => {
    return (
      <div className='chat-item flex justify-end my-4'>
        <p
          className='w-9/12 border border-blue-900 bg-blue-900 text-white rounded-lg p-2'
          data-id={props.message.id}
        >
          {props.message.message}
        </p>
      </div>
    )
  }

  const systemMessage = () => {
    return (
      <div>
        {responseMessage.length > 0 ? (
          <div
            className={`${styles.markdown}
                         w-9/12 chat-item flex justify-start my-4 border-emerald-800 bg-emerald-800 text-white rounded-lg p-2`}
          >
            <div dangerouslySetInnerHTML={{ __html: responseMessage }}></div>
          </div>
        ) : (
          <></>
        )}
      </div>
    )
  }

  useEffect(() => {
    if (props.message && !streamingEnded) {
      onMessageSended(props.message.message)
    }
  }, [props.message])

  return (
    <div>
      {userMessage()}
      {systemMessage()}
    </div>
  )
}

export interface IChatItemProps {
  abort: AbortController
  message: ChatMessage
  onStreamingEnded?: (message: string) => void
}

const ChatItemMemo = React.memo(ChatItem)

export default ChatItemMemo
