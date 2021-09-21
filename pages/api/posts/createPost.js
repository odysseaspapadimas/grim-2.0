import clientPromise from "../../../lib/mongodb";

export default async function createPost(req, res) {
  const client = await clientPromise;

  const db = client.db();

  const {
    avatarSrc,
    caption,
    comments,
    dateCreated,
    imageSrc,
    likes,
    username,
  } = req.body;

  const response = await db.collection("posts").insertOne({
    avatarSrc,
    caption,
    comments,
    dateCreated,
    imageSrc,
    likes,
    username,
  });

  console.log(response);

  res.status(201).send({ response });
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20mb'
        }
    }
}