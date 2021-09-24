import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async function deletePost(req, res) {
  const client = await clientPromise;

  const db = client.db();

  const { postId } = req.body;

  const response = await db.collection("posts").deleteOne({
    _id: new ObjectId(postId),
  });

  console.log(response);

  res.status(201).send({ response });
}
