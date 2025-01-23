import { useState, useEffect, useRef, SetStateAction } from "react";
import { io } from "socket.io-client";
import Layout from "../../components/Layout/Layout";
import useAuth from "../../context/useAuth";
import LoginRequired from "../LoginRequired";
import { FaPaperPlane } from "react-icons/fa";
import { marked } from "marked";


const baseUrl = import.meta.env.VITE_API_BASE_URL;

const renderer = new marked.Renderer();
renderer.link = ({ href, title, text }) => {
  return `<a href="${href}" title="${title}" class="markdown-link">${text}</a>`;
};


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

  const handleTyping = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setMessage(event.target.value);
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
      <div className="min-h-screen bg-white flex">
        <div className="w-full flex flex-col shadow-lg">
          <div
            className="flex-1 p-4 space-y-4 overflow-y-auto bg-white"
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
                      ? "bg-blue-100 text-gray-800"
                      : "bg-gray-200 text-gray-800 text-right"
                  }`}
                >
                  <span className="block text-xs text-gray-500">
                    {msg.timestamp}
                  </span>
                  <p className="mt-1 text-sm">
                    <strong>{msg.sender}</strong>{" "}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: marked(msg.text, { renderer }),
                      }}
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 bg-white shadow-md sticky bottom-0 border-t border-gray-300">
            <div className="flex items-center">
              <input
                type="text"
                value={message}
                onChange={handleTyping}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 p-3 rounded-md focus:outline-none"
                style={{ border: "none" }}
                disabled={!auth?.token}
              />
              {auth?.token && (
                <button
                  onClick={handleSendMessage}
                  className="ml-3 p-3 bg-yellow-500 text-black font-medium rounded-md hover:bg-yellow-400 shadow-md transition-transform transform hover:scale-105 flex items-center justify-center"
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
