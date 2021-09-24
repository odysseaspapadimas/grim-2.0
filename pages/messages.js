import { useRouter } from "next/router";
import useUser from "../hooks/useUser";
import ReactLoading from "react-loading";
import { useSession } from "next-auth/client";
import { useState, useEffect } from "react";

const messages = () => {
  const router = useRouter();
  const [session] = useSession();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!session) return;
    const fetchUser = async () => {
      const { user } = await useUser(session);

      setUser(user);
    };
    fetchUser();
  }, []);

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

  return (
    <div className="relative flex items-center w-screen justify-center py-3">
      <button className="absolute top-3 left-4" onClick={() => router.back()}>
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
      </button>
      <h1>{user.username}</h1>
    </div>
  );
};

export default messages;

messages.requireAuth = true;
