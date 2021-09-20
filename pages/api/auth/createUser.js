import { getSession } from "next-auth/client";
import clientPromise from "../../../lib/mongodb";

export default async function (req, res) {
  const session = await getSession({ req });

  //creating test users

  if (!session) {
    res.status(500).send({ msg: "You must be signed in to do this" });
    return;
  }

  const { username, email, fullName } = req.body;
  const client = await clientPromise;

  const db = client.db();

  try {
    const response = await db.collection("users").insertOne({
      username,
      email,
      fullName,
      dateCreated: new Date(Date.now()).toISOString(),
      imageSrc: session.user.image,
      followers: [],
      following: [],
    });

    console.log("response", response);
    res.status(201).send({ response });
  } catch (error) {
    res.status(500).send({ error });
  }
}
