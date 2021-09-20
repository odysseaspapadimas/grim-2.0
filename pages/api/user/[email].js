import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  const client = await clientPromise;

  const db = client.db();

  const { email } = req.query;

  try {
    const user = await db.collection("users").find({ email }).toArray();

    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send({ error });
  }
};
