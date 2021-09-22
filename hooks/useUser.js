export default async function useUser(session) {

  const res = await fetch(`/api/user/${session.user.email}`);

  const { user } = await res.json();
  
  return { user: user[0] };
}
