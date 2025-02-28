"use client"

import { useEffect, useRef, useState } from "react"
import { socket } from "@/lib/socketClient"
import ChatForm from "@/components/ChatForm"
import ChatMessage from "@/components/ChatMessage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Users, MessageSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface Message {
  sender: string
  message: string
  timestamp?: Date
}

export default function Home() {
  const [roomId, setRoomId] = useState("")
  const [joined, setJoined] = useState(false)
  const [username, setUsername] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnecting, setIsConnecting] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  useEffect(() => {
    socket.on("message", (data: Message) => {
      setMessages((prev) => [...prev, { ...data, timestamp: new Date() }])
    })

    socket.on("user joined", (message: string) => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "system",
          message,
          timestamp: new Date(),
        },
      ])
      toast({
        title: "New user joined",
        description: message,
      })
    })

    socket.on("connect_error", () => {
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Failed to connect to the chat server",
      })
      setIsConnecting(false)
    })

    return () => {
      socket.off("user_joined")
      socket.off("chat message")
      socket.off("connect_error")
    }
  }, [toast])

  const handleSubmit = (message: string) => {
    const data = { room: roomId, message, sender: username }
    setMessages((prev) => [
      ...prev,
      {
        sender: username,
        message,
        timestamp: new Date(),
      },
    ])
    socket.emit("message", data)
  }

  const handleJoinRoom = () => {
    if (!roomId.trim() || !username.trim()) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter both room ID and username",
      })
      return
    }

    setIsConnecting(true)
    socket.emit("join-room", roomId, username)
    setJoined(true)
    setIsConnecting(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <AnimatePresence mode="wait">
        {!joined ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Join Chat Room
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Enter room ID"
                    onChange={(e) => setRoomId(e.target.value)}
                    disabled={isConnecting}
                  />
                  <Input
                    type="text"
                    placeholder="Enter username"
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isConnecting}
                  />
                </div>
                <Button onClick={handleJoinRoom} disabled={isConnecting} className="w-full">
                  {isConnecting ? "Connecting..." : "Join Room"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Room: {roomId}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {username}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] overflow-y-auto rounded-lg bg-muted/50 p-4 space-y-4">
                  <AnimatePresence initial={false}>
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChatMessage
                          sender={message.sender}
                          message={message.message}
                          isOwnMessage={message.sender === username}
                          timestamp={message.timestamp}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>
                <div className="mt-4">
                  <ChatForm onSendMessage={handleSubmit} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

