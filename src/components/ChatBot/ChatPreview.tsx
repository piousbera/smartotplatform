
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, SendHorizontal, X, User } from "lucide-react";

interface ChatPreviewProps {
  primaryColor: string;
  fontFamily: string;
  position: "left" | "right";
  iconName: string;
}

export const ChatPreview = ({
  primaryColor,
  fontFamily,
  position,
  iconName,
}: ChatPreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: message }]);
    setMessage("");

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Thanks for your message! I'm a preview bot, so I'll respond with this pre-defined message.",
        },
      ]);
    }, 1000);
  };

  const renderIcon = () => {
    switch (iconName) {
      case "message-circle":
        return <MessageCircle size={20} />;
      case "send-horizontal":
        return <SendHorizontal size={20} />;
      default:
        return <MessageCircle size={20} />;
    }
  };

  return (
    <>
      {isOpen ? (
        <div
          className="rounded-lg shadow-lg max-w-sm w-full flex flex-col max-h-[400px] overflow-hidden"
          style={{
            fontFamily,
            backgroundColor: "#fff",
          }}
        >
          {/* Chat Header */}
          <div
            className="p-4 flex items-center justify-between"
            style={{ backgroundColor: primaryColor }}
          >
            <div className="text-white font-medium">Chat Support</div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:opacity-80"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg px-3 py-2 max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100"
                  }`}
                  style={
                    msg.sender === "user" ? { backgroundColor: primaryColor } : {}
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t flex gap-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button
              size="sm"
              onClick={handleSendMessage}
              style={{ backgroundColor: primaryColor }}
            >
              <SendHorizontal size={16} />
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`absolute bottom-4 ${
            position === "left" ? "left-4" : "right-4"
          }`}
        >
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
            style={{ backgroundColor: primaryColor }}
            onClick={() => setIsOpen(true)}
          >
            {renderIcon()}
          </button>
        </div>
      )}
    </>
  );
};
