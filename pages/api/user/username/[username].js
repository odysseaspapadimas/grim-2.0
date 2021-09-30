import clientPromise from "../../../../lib/mongodb";

export default async function username(req, res) {
  const client = await clientPromise;

  const db = client.db();

  const { username } = req.query;
  console.log(username, "query");
  const user = await db.collection("users").find({ username }).toArray();

  res.status(200).send(user[0]);
}
