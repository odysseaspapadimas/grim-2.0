import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;

  const db = client.db();

  const { user } = req.query;

  const unreadMessages = await db
    .collection("messages")
    .find({
      $and: [
        { "users.username": user },
        {
          read: false,
        },
      ],
    })
    .toArray();

  console.log(unreadMessages, "response read");

  res.status(200).send(unreadMessages);
}
