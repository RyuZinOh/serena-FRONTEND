import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { FaCommentDots, FaArrowRight, FaUser, FaCircle } from "react-icons/fa";
import Layout from "../../components/Layout/Layout";
import ChannelMenu from "../../components/Layout/ChannelMenu";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const socket = io(baseUrl);

const Botcommands: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    { text: string; timestamp: string; sender: string; channel: string }[]
  >([]);
  const [typing, setTyping] = useState<boolean>(false);
  const [selectedChannel, setSelectedChannel] = useState<string>("General");

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      const promptUsername = prompt("Enter your username:");
      if (promptUsername) {
        sessionStorage.setItem("username", promptUsername);
        setUsername(promptUsername);
      }
    }

    if (username) {
      socket.on(
        "message",
        (data: {
          text: string;
          timestamp: string;
          sender: string;
          channel: string;
        }) => {
          if (data.channel === selectedChannel) {
            setMessages((prevMessages) => [...prevMessages, data]);
          }
        }
      );

      socket.on("typing", () => setTyping(true));
      socket.on("stop_typing", () => setTyping(false));
    }

    return () => {
      socket.off("message");
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, [username, selectedChannel]);

  const sendMessage = () => {
    if (username) {
      const timestamp = new Date().toLocaleTimeString();
      socket.emit("message", {
        text: message,
        timestamp,
        sender: username,
        channel: selectedChannel,
      });
      setMessage("");
    }
  };

  const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
    if (event.target.value) {
      socket.emit("typing");
    } else {
      socket.emit("stop_typing");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && message.trim()) {
      sendMessage();
    }
  };

  const handleChannelSelect = (channel: string) => {
    setSelectedChannel(channel);
  };

  if (!username) {
    return null;
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
        <ChannelMenu onChannelSelect={handleChannelSelect} />
        <div className="w-3/4 bg-white flex flex-col shadow-lg">
          <div className="flex items-center px-4 py-2 border-b border-gray-200">
            <FaCommentDots size={24} className="text-gray-600" />
            <span className="ml-2 text-lg font-semibold text-gray-800">
              Chat - {selectedChannel}
            </span>
          </div>
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className="flex items-start space-x-2">
                <FaUser size={20} className="text-gray-500" />
                <div>
                  <span className="text-xs text-gray-400">{msg.timestamp}</span>
                  <p className="text-sm text-gray-800">
                    <strong>{msg.sender}:</strong> {msg.text}
                  </p>
                </div>
              </div>
            ))}
            {typing && (
              <p className="text-gray-400 text-sm">
                <FaCircle
                  className="inline-block text-blue-400 mr-1"
                  size={8}
                />
                Someone is typing...
              </p>
            )}
          </div>
          <div className="px-4 py-2 bg-gray-100 shadow-md">
            <div className="flex items-center">
              <input
                type="text"
                value={message}
                onChange={handleTyping}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center space-x-1"
              >
                <FaArrowRight size={16} />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Botcommands;
