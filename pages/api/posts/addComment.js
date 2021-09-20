import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  const client = await clientPromise;

  const db = client.db();

  const { comment, username, dateCreated, postId } = req.body;
  try {
    const response = await db.collection("posts").updateOne(
      { _id: new ObjectId(postId) },
      {
        $push: {
          comments: { username, content: comment, dateCreated },
        },
      }
    );

    res.status(201).send({ response });
  } catch (error) {
    res.status(500).send({ error });
  }
}
