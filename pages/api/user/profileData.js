import clientPromise from "../../../lib/mongodb";

export default async function profileData(req, res) {
  const client = await clientPromise;

  const db = client.db();

  const user = req.query.q;

  const userPosts = await db
    .collection("posts")
    .find({ username: user })
    .toArray();

  const postAmount = await db
    .collection("posts")
    .find({ username: user })
    .count();

  res.status(200).send({ userPosts, postAmount });
}
