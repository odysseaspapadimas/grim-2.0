import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/client";
import ReactLoading from "react-loading";

export default function AuthGuard({ children }) {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      //auth is initialized and there is no user
      if (!session) {
        // remember the page that user tried to access
        // redirect
        router.push("/api/auth/signin");
      }
    }
  }, [loading, router, session]);

  /* show loading indicator while the auth provider is still loading */
  if (loading) {
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

  // if auth initialized with a valid user show protected page
  if (!loading && session) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}
