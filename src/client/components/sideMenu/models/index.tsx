import { FineTune, ListFineTunesResponse } from 'openai'
import { useContext, useEffect, useState } from 'react'
import { ModelsContext } from 'src/client/contexts/models'
import { fetchWithBody } from 'src/client/endpoints'
import ModelItem from './item'

const SideModels = () => {
  const modelsContext = useContext(ModelsContext)

  return (
    <div className='text-white'>
      <h1>Models</h1>
      {modelsContext.models.map((model) => {
        return (
          <ModelItem
            selected={modelsContext.selectedModel?.id === model.id}
            onselected={modelsContext.setSelectedModel}
            model={model}
            key={model.id}
          />
        )
      })}
    </div>
  )
}

export default SideModels
