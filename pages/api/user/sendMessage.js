import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;

  const db = client.db();

  const { username, to, message, myAvatar, senderAvatar } = req.body;

  const messages = await db
    .collection("messages")
    .find({ "users.username": { $all: [username, to] } })
    .toArray();

  console.log(messages, "send message messages");
  if (messages.length > 0) {
    const response = await db.collection("messages").updateOne(
      { "users.username": { $all: [username, to] } },
      {
        $push: {
          messages: {
            content: message,
            dateSent: new Date(Date.now()).toISOString(),
            sender: username,
          },
        },
        $set: {
          dateLastSent: new Date(Date.now()).toISOString(),
          read: false,
        },
      }
    );

    console.log(response, "response update");

    res.status(201).send(response);
  } else {
    const response = await db.collection("messages").insertOne({
      users: [
        {
          username,
          avatarSrc: myAvatar,
        },
        {
          username: to,
          avatarSrc: senderAvatar,
        },
      ],
      messages: [
        {
          content: message,
          dateSent: new Date(Date.now()).toISOString(),
          sender: username,
        },
      ],
      dateLastSent: new Date(Date.now()).toISOString(),
      read: false,
    });

    console.log(response, "response");

    res.status(201).send(response);
  }
}
