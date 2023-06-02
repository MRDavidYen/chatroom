import { FineTune } from 'openai'

const ModelItem = ({ ...props }: ModelItemProps) => {
  const { model, onselected, selected } = props

  const selectModel = () => {
    onselected(model)
  }

  return (
    <div className='p-2 rounded-md border border-gray-400'>
      <p>{model.id}</p>
      <p>{model.model}</p>
      <button
        onClick={selectModel}
        className={`bg-green-600 p-1 rounded-md my-2 ${
          selected ? 'bg-gray-400' : ''
        }`}
      >
        {selected ? 'Selected' : 'Select'}
      </button>
    </div>
  )
}

export type ModelItemProps = {
  model: FineTune
  selected: boolean
  onselected: (model: FineTune) => void
}

export default ModelItem
