import Link from "next/link";
import useSWR from "swr";

const ChatItem = ({ myUsername, sender, senderAvatar, lastMessage, read }) => {
  return (
    <Link href={`/chats?w=${sender}`}>
      <div className="w-full flex item-center mt-4">
        <img
          src={senderAvatar}
          alt="user profile"
          className="h-12 w-12 object-contain rounded-full mr-3"
        />
        <div className="flex flex-col justify-center items-start">
          <h2>{sender}</h2>
          {/* last message, sent at, bold if !read */}
          <p
            className={`text-sm ${
              !read && lastMessage.sender !== myUsername
                ? "text-white font-semibold"
                : "text-gray-500"
            }`}
          >
            {lastMessage.sender === myUsername
              ? `Me: ${lastMessage.content}`
              : lastMessage.content}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ChatItem;
