import clientPromise from "../../../lib/mongodb";

export default async function posts(req, res) {
  const client = await clientPromise;

  const db = client.db();
  const { user } = req.body;

  try {
    const posts = await db
      .collection("posts")
      .find({ username: { $in: user.following } })
      .sort({ dateCreated: -1 })
      .toArray();

    res.status(200).send({ posts });
  } catch (err) {
    res.status(500).send({ err });
  }
}
