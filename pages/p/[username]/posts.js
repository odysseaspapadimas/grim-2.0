import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Post from "../../../components/Post/Post";
import useUser from "../../../hooks/useUser";
import clientPromise from "../../../lib/mongodb";

const UserPosts = ({ userPosts, myUser }) => {
  const router = useRouter();
  const [posts, setPosts] = useState(userPosts);

  useEffect(() => {
    console.log(posts, "changed posts");
  }, [posts]);

  return (
    <div>
      <div className="fixed z-10 top-0 flex items-center w-full px-3 py-2 bg-primary">
        <button className="" onClick={() => router.back()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#fff"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <div className=" ml-4">{router.query.username}'s posts</div>
      </div>
      <div className="mt-14">
        {posts.length > 0 &&
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              username={post.username}
              avatarSrc={post.avatarSrc}
              imageSrc={post.imageSrc}
              caption={post.caption}
              likes={post.likes}
              comments={post.comments}
              date={post.dateCreated}
              myUser={myUser}
              postFocus={router.query.post}
              setPosts={setPosts}
            />
          ))}
      </div>
    </div>
  );
};

export default UserPosts;

UserPosts.requireAuth = true;

export async function getServerSideProps(context) {
  const client = await clientPromise;

  const db = client.db();

  const profileUsername = context.query.username;

  const { req } = context;
  const session = await getSession({ req });

  const { user: myUser } = await useUser(session);

  const userPosts = await db
    .collection("posts")
    .find({ username: profileUsername })
    .sort({ dateCreated: -1 })
    .toArray();

  return {
    props: { userPosts: JSON.parse(JSON.stringify(userPosts)), myUser }, // will be passed to the page component as props
  };
}
