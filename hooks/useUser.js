export default async function useUser(session) {
  const dev = process.env.NODE_ENV !== "production";

  const server = dev
    ? "http://grim-next.ddns.net:3000"
    : "https://parea.vercel.app";

  const res = await fetch(`${server}/api/user/${session.user.email}`);

  const { user } = await res.json();

  return { user: user[0] };
}
