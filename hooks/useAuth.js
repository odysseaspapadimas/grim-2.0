import { useSession } from "next-auth/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function useAuth() {
  const [session, loading] = useSession();
  const [redirect, setRedirect] = useState("/");
  const [user, setUser] = useState({});
  const router = useRouter();
  useEffect(() => {
    if (!session) return;
    console.log("hiii", redirect);
    router.push(redirect);
    setUser(session.user);
  }, [session, redirect]);
  return { user, loading, setRedirect };
}
