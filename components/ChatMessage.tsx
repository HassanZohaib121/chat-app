import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface ChatMessageProps {
  sender: string
  message: string
  isOwnMessage: boolean
  timestamp?: Date
  avatar?: string
}

export default function ChatMessage({
  sender,
  message,
  isOwnMessage,
  timestamp = new Date(),
  avatar,
}: ChatMessageProps) {
  const isSystemMessage = sender === "system"

  return (
    <div
      className={cn(
        "flex w-full items-start gap-2 py-2",
        isSystemMessage ? "justify-center" : isOwnMessage ? "justify-end" : "justify-start",
      )}
    >
      {!isOwnMessage && !isSystemMessage && (
        <Avatar className="h-8 w-8">
          {avatar ? (
            <AvatarImage src={avatar} alt={sender} />
          ) : (
            <AvatarFallback>{sender.charAt(0).toUpperCase()}</AvatarFallback>
          )}
        </Avatar>
      )}

      <div className={cn("flex flex-col max-w-[80%] md:max-w-[60%]", isOwnMessage && "items-end")}>
        {!isSystemMessage && !isOwnMessage && <span className="text-xs text-muted-foreground mb-1">{sender}</span>}

        <div
          className={cn(
            "px-4 py-2 rounded-lg",
            isSystemMessage && "bg-muted text-center text-xs px-3 py-1.5 rounded-full",
            isOwnMessage && "bg-primary text-primary-foreground rounded-tr-none",
            !isSystemMessage && !isOwnMessage && "bg-secondary text-secondary-foreground rounded-tl-none",
          )}
        >
          <p className="break-words">{message}</p>
        </div>

        <span className="text-[10px] text-muted-foreground mt-1">{format(timestamp, "h:mm a")}</span>
      </div>

      {isOwnMessage && (
        <Avatar className="h-8 w-8">
          {avatar ? (
            <AvatarImage src={avatar} alt={sender} />
          ) : (
            <AvatarFallback>{sender.charAt(0).toUpperCase()}</AvatarFallback>
          )}
        </Avatar>
      )}
    </div>
  )
}

