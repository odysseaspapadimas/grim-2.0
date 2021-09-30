import { useRouter } from "next/router";
import useUser from "../../hooks/useUser";
import ReactLoading from "react-loading";
import { useSession } from "next-auth/client";
import { useState, useEffect, useRef } from "react";

import { Input, InputLeftElement, InputRightElement, InputGroup } from "@chakra-ui/react";
import useSWR from "swr";
import ChatItem from "../../components/Chats/ChatItem";
import Link from "next/link";
import Chat from "../../components/Chats/Chat";
import { getSeconds, parseISO } from "date-fns";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const inbox = () => {
  const router = useRouter();
  const [session] = useSession();
  const [user, setUser] = useState({});

  const [input, setInput] = useState("");

  const inputRef = useRef()

  const { data: messages, error } = useSWR(
    `/api/user/messages?user=${user.username}`,
    fetcher
  );

  const { data: users, error: userError } = useSWR(
    "/api/user/allUsers",
    fetcher
  );

  const fetchUser = async () => {
    const { user } = await useUser(session);

    setUser(user);
  };

  useEffect(() => {
    if (!session) return;
    fetchUser();
  }, []);

  const { data: otherUser, error: otherUserError } = useSWR(
    `/api/user/username/${router.query.w}`,
    fetcher
  );

  if (!user.username) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <ReactLoading
          type={"spin"}
          color={"#fff"}
          height={"20%"}
          width={"20%"}
        />
      </div>
    );
  }

  if (router.query.w && otherUser) {
    return <Chat user={user} otherUser={otherUser} />;
  }

  return (
    <div className="relative flex flex-col items-center w-screen justify-center py-3 px-4">
      <div className="absolute top-4 left-4">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#fff"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
      </div>
      <h1 className="text-lg border-b-2 border-white mb-4">Messages</h1>
      <p className="fixed bottom-1 right-1 text-xs">Reto sack ma</p>

      <InputGroup w={"full"}>
          <InputLeftElement
            pointerEvents="none"
            children={
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="#fff"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            }
          />
          <Input
            placeholder="Search"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <InputRightElement
            onClick={() => {
              setInput("");
              inputRef.current.focus();
            }}
            children={
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </>
            }
          />
        </InputGroup>
      {input && users ? (
        <div className="flex flex-col">
          {users
            .filter(
              (_user) =>
                _user.username.includes(input.toLowerCase()) &&
                _user.username !== user.username
            )
            .map((user) => (
              <div key={user.username} className="flex items-center p-2 border border-secondary my-2">
                <Link href={`/chats?w=${user.username}`}>
                  <img
                    src={user.imageSrc}
                    alt="user profile"
                    className="h-7 w-7 rounded-full mr-2"
                  />
                </Link>
                <Link href={`/chats?w=${user.username}`}>{user.username}</Link>
              </div>
            ))}
        </div>
      ) : (
        <>
          {messages && messages?.length > 0 ? (
            messages.map((message) => {
              const sender = message.users
                .map((_user) => {
                  if (_user.username !== user.username) {
                    return _user.username;
                  }
                })
                .filter((value) => value !== undefined)[0];

              const senderAvatar = message.users
                .map((_user) => {
                  if (_user.username !== user.username) {
                    return _user.avatarSrc;
                  }
                })
                .filter((value) => value !== undefined)[0];

              return (
                <ChatItem
                  key={message._id}
                  myUsername={user.username}
                  sender={sender}
                  senderAvatar={senderAvatar}
                  lastMessage={message.messages[message.messages.length - 1]}
                  read={message.read}
                />
              );
            })
          ) : messages && messages.length === 0 ? (
            <h1>No messages.</h1>
          ) : (
            <h1>Loading...</h1>
          )}
        </>
      )}
    </div>
  );
};

export default inbox;

inbox.requireAuth = true;
