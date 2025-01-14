import { FaHome, FaHashtag } from "react-icons/fa";

interface Channel {
  name: string;
}

const ChannelMenu: React.FC<{ onChannelSelect: (channel: string) => void }> = ({
  onChannelSelect,
}) => {
  const channels: Channel[] = [{ name: "General" }];

  return (
    <div className="w-1/4 bg-white border-r border-gray-200">
      <div className="flex items-center px-4 py-2 border-b border-gray-200">
        <FaHome size={24} className="text-gray-600" />
        <span className="ml-2 text-lg font-semibold text-gray-800">
          Channels
        </span>
      </div>
      <div className="p-4 space-y-2">
        {channels.map((channel, index) => (
          <p
            key={index}
            onClick={() => onChannelSelect(channel.name)}
            className="text-sm cursor-pointer hover:text-blue-500 transition-all"
          >
            <FaHashtag size={16} className="mr-2 inline" />
            {channel.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ChannelMenu;
