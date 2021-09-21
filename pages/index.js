import { signOut, useSession } from "next-auth/client";
import Head from "next/head";
import useUser from "../hooks/useUser";
import ReactLoading from "react-loading";
import Feed from "../components/Feed";
import { useEffect, useState } from "react";
import Profile from "../components/Profile";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useMediaQuery } from "@chakra-ui/media-query";
import Search from "../components/Search";
import { useRouter } from "next/router";
import CreatePost from "../components/CreatePost";

export default function Home() {
  const [session] = useSession();
  const { user } = useUser();
  const [tab, setTab] = useState({ selection: "feed" });
  const [isLargerThan500] = useMediaQuery("(min-width: 650px)");
  const router = useRouter();

  const doesUserExist = async (email) => {
    const res = await fetch("/api/login/userExists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const { user } = await res.json();

    if (user.length === 0) {
      //User exists redirect to dashboard
      router.push("/signup");
    }

  };
  useEffect(() => {
    if (session) {

      doesUserExist(session.user.email);
    }
  }, [session]);


  if (isLargerThan500) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <h1 className="text-3xl">Please use a mobile device.</h1>
      </div>
    );
  }

  if (!user) {
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
    <div className="relative">
      <Head children={undefined}>
        <title>Parea - Social Media Platform</title>
        <link rel="icon" href="/favicon.ico" />
        <meta content="parea, social media" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap"
          rel="stylesheet"
        />

        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="icons/apple-icon-180.png" />

        <meta name="theme-color" content="#317EFB" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      {tab.selection === "feed" && (
        <div className="fixed z-10 top-0 flex items-center w-full justify-between px-3 py-2 bg-primary border-b-2 border-gray-500">
          <h1 className="text-2xl">Parea</h1>
          <Link href="/messages" className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 "
              style={{ transform: "scale(-1, 1)" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </Link>
        </div>
      )}

      <main className="">
        {tab.selection === "feed" && <Feed user={user} />}
        {tab.selection === "search" && <Search />}
        {tab.selection === "create" && <CreatePost user={user} setTab={setTab} />}
        {tab.selection === "profile" && <Profile user={user} />}
      </main>

      <Navbar user={user} tab={tab} setTab={setTab} />
    </div>
  );
}

Home.requireAuth = true;
