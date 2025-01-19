import { useState, useEffect, useRef, SetStateAction } from "react";
import { io } from "socket.io-client";
import Layout from "../../components/Layout/Layout";
import useAuth from "../../context/useAuth";
import LoginRequired from "../LoginRequired";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Botcommands = () => {
  const [auth] = useAuth();
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    { text: string; timestamp: string; sender: string }[]
  >([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!auth?.token) return;

    const socketConnection = io(baseUrl, {
      extraHeaders: { Authorization: `Bearer ${auth.token}` },
    });

    setSocket(socketConnection);

    socketConnection.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      new Audio("/assets/pop.mp3").play();
    });

    socketConnection.on("typing", () => setIsTyping(true));
    socketConnection.on("stop_typing", () => setIsTyping(false));

    return () => {
      socketConnection.disconnect();
      setSocket(null);
    };
  }, [auth?.token]);

  useEffect(() => {
    const handleScroll = () => {
      if (messagesEndRef.current) {
        setIsAtBottom(
          messagesEndRef.current.scrollTop +
            messagesEndRef.current.clientHeight ===
            messagesEndRef.current.scrollHeight
        );
      }
    };

    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    const element = messagesEndRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      element?.removeEventListener("scroll", handleScroll);
    };
  }, [isAtBottom, messages]);

  const handleTyping = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setMessage(event.target.value);
    if (socket) {
      socket.emit(event.target.value ? "typing" : "stop_typing");
    }
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter" && message.trim()) {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (socket && message.trim()) {
      const timestamp = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      socket.emit("message", {
        text: message.trim(),
        timestamp,
        sender: auth?.user?.name,
      });
      setMessage("");
    }
    setIsAtBottom(false);
  };

  if (!auth?.token) {
    return <LoginRequired />;
  }

  return (
    <Layout
      title="cmdlets - serena"
      description="fire any bot commands and chat with other folks"
      author="Serena Team"
      keywords="pokemon, botcommands, chat"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="min-h-screen bg-gray-50 flex">
        <div className="w-full bg-white flex flex-col shadow-lg">
          <div className="flex items-center px-4 py-2 border-b border-gray-200 sticky top-0 bg-white z-10">
            <span className="ml-2 text-lg font-semibold text-gray-800">
              Chat
            </span>
          </div>
          <div
            className="flex-1 p-4 space-y-4 overflow-y-auto"
            ref={messagesEndRef}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 ${
                  msg.sender === auth?.user?.name ? "" : "justify-end"
                }`}
              >
                <div
                  className={`${
                    msg.sender === auth?.user?.name
                      ? "bg-blue-100"
                      : "bg-gray-100 text-right"
                  } p-2 rounded-lg`}
                >
                  <span className="text-xs text-gray-400">{msg.timestamp}</span>
                  <p className="text-sm text-gray-800">
                    <strong>{msg.sender}:</strong> {msg.text}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-sm text-gray-500">Someone is typing...</div>
            )}
          </div>
          <div className="px-4 py-2 bg-gray-100 shadow-md sticky bottom-0">
            <div className="flex items-center">
              <input
                type="text"
                value={message}
                onChange={handleTyping}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!auth?.token}
              />
              {auth?.token && (
                <button
                  onClick={handleSendMessage}
                  className="ml-2 p-2 bg-black text-white rounded-md hover:bg-blue-600 flex items-center space-x-1"
                >
                  <span>Send</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Botcommands;
