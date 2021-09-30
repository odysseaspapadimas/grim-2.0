import clientPromise from "../../../lib/mongodb";

export default async function profileData(req, res) {
  const client = await clientPromise;

  const db = client.db();

  const user = req.query.user;
  if (!user) return;

  const messages = await db
    .collection("messages")
    .find({
      "users.username": user,
    })
    .sort({ dateLastSent: -1 })
    .toArray();

  console.log(messages, "messages");

  res.status(200).send(messages);
}
