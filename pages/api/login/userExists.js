import clientPromise from "../../../lib/mongodb";

export default async function userExists(req, res) {
  const client = await clientPromise;

  const db = client.db();

  const { email } = req.body;

  const user = await db.collection("users").find({ email }).toArray();
  
  res.status(200).json({ user });
}
