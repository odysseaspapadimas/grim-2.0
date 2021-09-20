import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function toggleLike(req, res) {
  const { postId, username, toggleLiked } = req.body;

  const client = await clientPromise;

  const db = client.db();
  console.log(postId, username, toggleLiked, "eza");

  if (!toggleLiked) {
    db.collection("posts").updateOne(
      {
        _id: new ObjectId(postId),
      },
      {
        $push: {
          likes: username,
        },
      }
    );
  } else {
    db.collection("posts").updateOne(
      {
        _id: new ObjectId(postId),
      },
      {
        $pull: {
          likes: username,
        },
      }
    );
  }

  res.status(201).send({ msg: "Success" });
}
