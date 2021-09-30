import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;

  const db = client.db();

  const { user, otherUser } = req.body;

  const response = await db.collection("messages").updateOne(
    { "users.username": { $all: [user, otherUser] } },
    {
      $set: {
        read: true,
      },
    }
  );

  res.status(201).send(response);
}
