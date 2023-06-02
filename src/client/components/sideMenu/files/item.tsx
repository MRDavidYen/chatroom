import { fetchWithBody } from 'src/client/endpoints'
import { TuningFileDocument } from 'src/server/persistants/firestore/models'

const FilesItem = ({ ...props }: FilesItemProps) => {
  const { file } = props

  const startTuning = async () => {
    const response = await fetchWithBody('/api/tuning', file, {
      method: 'POST',
    })
  }

  return (
    <div className='p-2 rounded-md border border-gray-400'>
      <p>{file.filename}</p>
      <p>{file.id}</p>
      <button
        onClick={startTuning}
        className='bg-green-600 p-1 rounded-md my-2'
      >
        Start Tuning
      </button>
    </div>
  )
}

export type FilesItemProps = {
  file: TuningFileDocument
}

export default FilesItem
