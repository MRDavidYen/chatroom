import { FineTune, ListFineTunesResponse } from 'openai'
import { createContext, useEffect, useState } from 'react'

const ModelsReducer = (): ModelsContextProps => {
  const [models, setModels] = useState<FineTune[]>([])
  const [selectedModel, setSelectedModel] = useState<FineTune | null>(null)

  useEffect(() => {
    const fetchModels = async () => {
      const res = await fetch('/api/tuning')
      const response = (await res.json()) as ListFineTunesResponse

      if (response) {
        setModels(response.data)
      }
    }

    fetchModels()
  }, [])

  return {
    models,
    setModels,
    selectedModel,
    setSelectedModel,
  }
}

const ModelsContext = createContext<ModelsContextProps>({
  models: [],
  setModels: () => {},
  selectedModel: null,
  setSelectedModel: () => {},
})

const ModelsProvider = ({ ...props }: ModelsContextProviderProps) => {
  const models = ModelsReducer()

  return (
    <ModelsContext.Provider value={models}>
      {props.children}
    </ModelsContext.Provider>
  )
}

export type ModelsContextProviderProps = {
  children: JSX.Element | JSX.Element[]
}

export type ModelsContextProps = {
  models: FineTune[]
  setModels: (models: FineTune[]) => void
  selectedModel: FineTune | null
  setSelectedModel: (model: FineTune | null) => void
}

export { ModelsProvider, ModelsContext }
