import { signIn, signOut, useSession, providers } from "next-auth/client";
import { useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import ReactLoading from "react-loading";

const login = () => {
  const [session] = useSession();

  const [loading, setLoading] = useState(false);

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
    setLoading(false);
    console.log(user, "user login");
    if (user.length > 0) {
      //User exists redirect to dashboard
      router.push("/");
    } else {
      //User doesn't exist redirect to create profile
      router.push("/signup");
    }
  };
  useEffect(() => {
    if (session) {
      console.log("lol");
      setLoading(true);
      doesUserExist(session.user.email);
    }
  }, [session]);
  return (
    <div>
      <Head children={undefined}>
        <title>Login - Grim</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {!loading ? (
          <>
            {!session ? (
              <button onClick={signIn}>Sign In</button>
            ) : (
              <>
                <p>Signed in as {session.expires.toString()}</p>
                <button onClick={signOut}>Sign Out</button>
                <button onClick={() => doesUserExist(session.user.email)}>
                  Does user exist
                </button>
              </>
            )}
          </>
        ) : (
          <div className="w-full min-h-screen flex justify-center items-center">
            <ReactLoading
              type={"spin"}
              color={"#fff"}
              height={"20%"}
              width={"20%"}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default login;
