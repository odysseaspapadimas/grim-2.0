import clientPromise from "../../../lib/mongodb";

export default async function followUser(req, res) {
  const client = await clientPromise;

  const db = client.db();

  const { myUsername, userToFollow, unfollow } = req.body;

  try {
    if (!unfollow) {
      db.collection("users").updateOne(
        { username: userToFollow },
        {
          $push: {
            followers: myUsername,
          },
        }
      );

      db.collection("users").updateOne(
        { username: myUsername },
        {
          $push: {
            following: userToFollow,
          },
        }
      );

      res.status(201).send({ msg: "Succesfully followed", userToFollow });
    } else {
      db.collection("users").updateOne(
        { username: userToFollow },
        {
          $pull: {
            followers: myUsername,
          },
        }
      );
      db.collection("users").updateOne(
        { username: myUsername },
        {
          $pull: {
            following: userToFollow,
          },
        }
      );

      res.status(201).send({ msg: "Succesfully followed", userToFollow });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
}
