"use client"

import { type FormEvent, useState } from "react"
import { Send } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

interface ChatFormProps {
  onSendMessage: (message: string) => void
  isLoading?: boolean
}

export default function ChatForm({ onSendMessage, isLoading = false }: ChatFormProps) {
  const [message, setMessage] = useState("")

  function handleSubmit(e: FormEvent): void {
    e.preventDefault()

    const trimmedMessage = message.trim()
    if (trimmedMessage === "") return

    onSendMessage(trimmedMessage)
    setMessage("")
  }

  return (
    <form className="flex gap-2 mt-4 relative" onSubmit={handleSubmit}>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 pr-10 min-h-[48px] border-muted-foreground/20"
        placeholder="Type your message here..."
        disabled={isLoading}
      />

      <Button
        type="submit"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
        disabled={message.trim() === "" || isLoading}
        aria-label="Send message"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}

