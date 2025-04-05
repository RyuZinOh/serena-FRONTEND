import { useState, useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import Layout from "../../components/Layout/Layout";
import useAuth from "../../context/useAuth";
import LoginRequired from "../LoginRequired";
import { FaPaperPlane, FaUsers } from "react-icons/fa";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface ConnectedUser {
  id: string;
  name: string;
}

interface ChatMessage {
  text: string;
  timestamp: string;
  sender: string;
  sender_id: string;
}

interface AuthState {
  token?: string;
  user: User | null;
}

const Botcommands = () => {
  const [auth] = useAuth() as [
    AuthState,
    React.Dispatch<React.SetStateAction<AuthState>>
  ];
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  const isCurrentUser = useCallback(
    (userId: string) => auth.user?.id === userId,
    [auth.user]
  );

  const handleNewMessage = useCallback((data: ChatMessage) => {
    setMessages((prev) => [...prev, data]);
  }, []);

  const handleUserConnected = useCallback(
    (data: {
      user_id: string;
      name: string;
      connected_users: Record<string, string>;
    }) => {
      setConnectedUsers(
        Object.entries(data.connected_users).map(([id, name]) => ({
          id,
          name,
        }))
      );
    },
    []
  );

  const handleUserDisconnected = useCallback(
    (data: {
      user_id: string;
      name: string;
      connected_users: Record<string, string>;
    }) => {
      setConnectedUsers(
        Object.entries(data.connected_users).map(([id, name]) => ({
          id,
          name,
        }))
      );
    },
    []
  );

  const handleConnectedUsersList = useCallback(
    (users: Record<string, string>) => {
      setConnectedUsers(
        Object.entries(users).map(([id, name]) => ({
          id,
          name,
        }))
      );
    },
    []
  );

  useEffect(() => {
    if (!auth.token) return;

    const socketConnection = io(baseUrl, {
      extraHeaders: { Authorization: `Bearer ${auth.token}` },
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: true,
    });

    socketRef.current = socketConnection;

    socketConnection.on("message", handleNewMessage);
    socketConnection.on("user_connected", handleUserConnected);
    socketConnection.on("user_disconnected", handleUserDisconnected);
    socketConnection.on("connected_users_list", handleConnectedUsersList);
    socketConnection.emit("get_connected_users");

    return () => {
      socketConnection.disconnect();
    };
  }, [
    auth.token,
    handleNewMessage,
    handleUserConnected,
    handleUserDisconnected,
    handleConnectedUsersList,
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMessageSubmit = () => {
    if (socketRef.current && message.trim() && auth.user) {
      const timestamp = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      socketRef.current.emit("message", {
        text: message.trim(),
        timestamp,
        sender: auth.user.name,
        sender_id: auth.user.id,
      });
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleMessageSubmit();
    }
  };

  if (!auth.token) {
    return <LoginRequired />;
  }

  return (
    <Layout
      title="cmdlets - serena"
      description="fire any bot commands and chat with other folks"
      author="Serena Team"
      keywords="pokemon, botcommands, chat"
    >
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r p-4 hidden md:block">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FaUsers className="text-gray-600" />
            Online ({connectedUsers.length})
          </h2>
          <div className="space-y-2">
            {connectedUsers.map((user) => (
              <div
                key={user.id}
                className={`p-2 rounded flex items-center gap-2 ${
                  isCurrentUser(user.id) ? "bg-gray-100" : "hover:bg-gray-50"
                }`}
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                </div>
                <span className={isCurrentUser(user.id) ? "font-medium" : ""}>
                  {isCurrentUser(user.id) ? "You" : user.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b p-4">
            <h1 className="font-semibold text-lg">Bot Commands</h1>
            <p className="text-sm text-gray-500">
              Chat with other users and use commands
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <FaPaperPlane className="mx-auto text-3xl mb-2" />
                  <p>Start chatting by sending a message</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      isCurrentUser(msg.sender_id)
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                        isCurrentUser(msg.sender_id)
                          ? "bg-black text-white"
                          : "bg-white border"
                      }`}
                    >
                      {!isCurrentUser(msg.sender_id) && (
                        <p className="font-medium text-sm mb-1">{msg.sender}</p>
                      )}
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          isCurrentUser(msg.sender_id)
                            ? "text-gray-300"
                            : "text-gray-500"
                        }`}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="bg-white border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message or command..."
                className="flex-1 p-3 border rounded focus:outline-none focus:ring-1 focus:ring-black"
              />
              <button
                onClick={handleMessageSubmit}
                disabled={!message.trim()}
                className={`p-3 rounded ${
                  message.trim()
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Botcommands;
