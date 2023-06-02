import { useContext, useState } from 'react'
import { ChatContext } from 'src/client/contexts/chat'
import { fetchWithBody } from 'src/client/endpoints'
import { CreateFilePayload } from 'src/pages/api/tuning/file'

const TuningModal = () => {
  const chatContext = useContext(ChatContext)
  const [fileName, setFileName] = useState('')
  const uploadFile = () => {
    const payload: CreateFilePayload = {
      conversions: chatContext.messages,
      fileName: 'test',
    }

    fetchWithBody('/api/tuning/file', payload, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return (
    <div>
      <div
        className='border border-gray-200 rounded-md 
      p-4 mb-4 flex flex-col max-h-[400px] overflow-y-auto'
      >
        {chatContext.messages.length > 0 &&
          chatContext.messages.map((message, index) => {
            return (
              <div key={index}>
                <div
                  className={` my-1 max-w-[80%] ${
                    message.role && message.role == 'user'
                      ? 'float-right'
                      : 'float-left'
                  }`}
                >
                  <p className='text-xs mb-1 text-white'>{message.role}</p>
                  <p
                    className={`text-white border border-white p-2 rounded-md ${
                      message.role && message.role == 'user'
                        ? 'bg-teal-700'
                        : 'bg-blue-700'
                    }`}
                  >
                    {message.message}
                  </p>
                </div>
              </div>
            )
          })}
      </div>
      <div className='text-white flex flex-col items-end'>
        <p>Make sure this is conversation what you want to tuning GPT model.</p>
        <p>Then, click the button below to upload tuning file.</p>
        <div className='flex items-center mt-2'>
          <input
            className='border-gray-600 bg-slate-600 text-white rounded-lg border py-2 w-60 px-2 mr-2'
            placeholder='file name'
            type='text'
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <button
            onClick={uploadFile}
            className='bg-green-700 text-white px-2 py-2 rounded-md'
          >
            upload file
          </button>
        </div>
      </div>
    </div>
  )
}

export default TuningModal
