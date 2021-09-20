import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  const client = await clientPromise;

  const db = client.db();

  try {
    const users = await db.collection("users").find({}).toArray();

    res.status(200).send({ users });
  } catch (error) {
    res.status(500).send({ error });
  }
};
