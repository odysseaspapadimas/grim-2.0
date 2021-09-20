export default async function useUserProfile(username) {
  const res = await fetch("/api/user/username/outis");

  const data = await res.json();

  console.log(data);
}
