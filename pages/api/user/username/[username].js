import clientPromise from "../../../../lib/mongodb";

export default async function username(req, res) {
  const client = await clientPromise;

  const db = client.db();

  const { username } = req.query;
  console.log(username, req.query);

  const user = await db.collection("users").find({ username }).toArray();
  console.log(user);
  res.status(200).send({ user });
}
