import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { api } from "@/lib/axios"

type Prompt = {
  id: string;
  title: string;
  template: string
}

type PromptSelectProps = {
  onPromptSelected: (template: string) => void;
}

export const PromptSelect = (props: PromptSelectProps) => {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null)

  const handlePromptSelected = (promptId: string) => {
    const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)

    if (!selectedPrompt) return 

    props.onPromptSelected(selectedPrompt.template)
  }

  useEffect(() => {
    api.get('/prompts').then(response => {
      console.log({t: response.data})
      setPrompts(response.data)
    })
  }, [])

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt" />
      </SelectTrigger>

      <SelectContent>
        {prompts?.map(prompt => {
          return (
            <SelectItem key={prompt.id} value={prompt.id}>{prompt.title}</SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}