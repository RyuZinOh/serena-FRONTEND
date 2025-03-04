import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Layout from "../../components/Layout/Layout";
import useAuth from "../../context/useAuth";
import LoginRequired from "../LoginRequired";
import { FaPaperPlane } from "react-icons/fa";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Botcommands = () => {
  const [auth] = useAuth();
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    { text: string; timestamp: string; sender: string }[]
  >([]);
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

    return () => {
      socketConnection.disconnect();
      setSocket(null);
    };
  }, [auth.token]);

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

  const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
      <div className="min-h-screen bg-base-100 flex justify-center">
        <div className="w-full max-w-7xl flex flex-col shadow-lg bg-base-200 rounded-lg">
          {/* Header */}
          <div className="p-4 bg-primary text-primary-content rounded-t-lg">
            <h1 className="text-2xl font-bold text-center">Bot Commands</h1>
          </div>

          {/* Messages Container */}
          <div
            className="flex-1 p-4 space-y-4 overflow-y-auto bg-base-100"
            ref={messagesEndRef}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start ${
                  msg.sender === auth?.user?.name
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg shadow-sm ${
                    msg.sender === auth?.user?.name
                      ? "bg-primary text-primary-content"
                      : "bg-secondary text-secondary-content"
                  }`}
                >
                  <span className="block text-xs text-opacity-50">
                    {msg.timestamp}
                  </span>
                  <p className="mt-1 text-sm">
                    <strong>{msg.sender}</strong> {msg.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Container */}
          <div className="px-4 py-3 bg-base-100 shadow-md sticky bottom-0 border-t border-base-300 rounded-b-lg">
            <div className="flex items-center">
              <input
                type="text"
                value={message}
                onChange={handleTyping}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 p-3 rounded-md bg-base-200 focus:outline-none"
                style={{ border: "none" }}
                disabled={!auth?.token}
              />
              {auth?.token && (
                <button
                  onClick={handleSendMessage}
                  className="ml-3 p-3 bg-accent text-accent-content font-medium rounded-md hover:bg-accent-focus shadow-md transition-transform transform hover:scale-105 flex items-center justify-center"
                >
                  {message.trim() ? (
                    <div className="flex space-x-1">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </div>
                  ) : (
                    <FaPaperPlane />
                  )}
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
