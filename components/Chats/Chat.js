import { Input } from "@chakra-ui/input";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "../../helpers/fetcher";
import { useState, useRef, useEffect } from "react";

const Chat = ({ user, otherUser }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef();
  const scrollRef = useRef();
  const {
    data: chats,
    error,
    mutate,
  } = useSWR(`/api/user/messages?user=${user.username}`, fetcher);

  const readMessage = async () => {
    const res = await fetch("/api/user/readMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user.username,
        otherUser: otherUser.username,
      }),
    });
  };

  useEffect(() => {
    inputRef?.current?.focus();
    chats?.forEach((chat) => {
      if (
        chat.users
          .map((_user) => {
            if (_user.username === otherUser.username) {
              return true;
            }
          })
          .filter((value) => value !== undefined)[0] &&
        chat.messages[chat.messages.length - 1].sender !== user.username
      ) {
        readMessage();
      }
    });

    scrollRef.current?.scrollIntoView();
  }, [chats]);
  const handleForm = async (e) => {
    e.preventDefault();
    console.log(user, otherUser);
    setInput("");

    const res = await fetch("/api/user/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        to: otherUser.username,
        message: input,
        myAvatar: user.imageSrc,
        senderAvatar: otherUser.imageSrc,
      }),
    });

    const response = await res.json();
    console.log(response, "response");

    mutate();
  };

  return (
    <div
      className="h-screen flex flex-col"
      style={{ minHeight: "-webkit-fill-available" }}
    >
      <div className="flex items-center p-3">
        <Link href="/chats">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 "
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
        <Link href={`/p/${otherUser.username}`}>
          <img
            src={otherUser.imageSrc}
            alt="profile"
            className="h-7 w-7 rounded-full ml-2"
          />
        </Link>
        <Link href={`/p/${otherUser.username}`}>
          <p className="font-semibold ml-2">{otherUser.username}</p>
        </Link>
      </div>

      {chats &&
        !error &&
        chats.map((messages, i) => {
          if (
            messages.users
              .map((_user) => {
                if (_user.username === otherUser.username) {
                  return true;
                }
              })
              .filter((value) => value !== undefined)[0]
          ) {
            return (
              <div
                key={i}
                className=" p-4 flex flex-col w-full space-y-2 overflow-y-auto"
              >
                {messages.messages.map(({ content, sender, dateSent }) => (
                  <div
                    key={dateSent + content}
                    className={`flex items-center ${
                      sender === otherUser.username ? "self-start" : "self-end"
                    }`}
                  >
                    <div className="bg-secondary py-2 px-3 rounded-xl">
                      <p> {content}</p>
                    </div>
                  </div>
                ))}
                <span ref={scrollRef}></span>
              </div>
            );
          }
        })}
      <form
        action="POST"
        onSubmit={handleForm}
        className="mt-auto w-screen flex items-center"
      >
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" className=" p-1">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
