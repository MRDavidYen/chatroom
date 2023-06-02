import { useEffect, useState } from 'react'
import { TuningFileDocument } from 'src/server/persistants/firestore/models'
import FilesItem from './item'

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
    <div className='text-white max-h-[200px] overflow-y-auto'>
      <h1>Files</h1>
      <div className='my-4'>
        {files.map((file, index) => {
          return <FilesItem file={file} key={file.id} />
        })}
      </div>
    </div>
  )
}

export default SideFiles
