import { getSession, useSession } from "next-auth/client";
import { useEffect, useState } from "react";

export default function useUser() {
  const [session] = useSession();
  const [user, setUser] = useState();

  const fetchUser = async () => {
    const res = await fetch(`/api/user/${session.user.email}`);

    const { user } = await res.json();
    setUser(user[0]);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user };
}
