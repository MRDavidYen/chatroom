import { useEffect, useState } from 'react'
import { TuningFileDocument } from 'src/server/persistants/firestore/models'

const SideFiles = () => {
  const [files, setFiles] = useState<TuningFileDocument[]>([])

  useEffect(() => {
    const fetchFiles = async () => {
      const res = await fetch('/api/tuning/file')
      const data = await res.json()
      setFiles(data)
    }

    fetchFiles()
  }, [])

  return (
    <div className='text-white'>
      <h1>Files</h1>
      <div className='my-4'>
        {files.map((file, index) => {
          return (
            <div key={index} className='p-2 rounded-md border border-gray-400'>
              <p>{file.filename}</p>
              <p>{file.id}</p>
              <button className='bg-green-600 p-1 rounded-md my-2'>Start Tuning</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SideFiles
