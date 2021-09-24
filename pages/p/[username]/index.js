import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import useUser from "../../../hooks/useUser";
import ReactLoading from "react-loading";
import clientPromise from "../../../lib/mongodb";
import Link from "next/link";
import { useState } from "react";

const Profile = ({ userProfile, user, posts }) => {
  const router = useRouter();

  const [isFollowing, setIsFollowing] = useState(
    user.following.includes(userProfile.username)
  );

  if (!user.username) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <ReactLoading
          type={"spin"}
          color={"#fff"}
          height={"20%"}
          width={"20%"}
        />
      </div>
    );
  }

  if (!userProfile) {
    return (
      <>
        <h1>User not found</h1>
      </>
    );
  }

  const handleFollow = async () => {
    setIsFollowing(!isFollowing);

    const res = await fetch("/api/user/followUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        myUsername: user.username,
        userToFollow: userProfile.username,
        unfollow: user.following.includes(userProfile.username),
      }),
    });
  };

  return (
    <div className=" px-3 py-4">
      <div className="flex items-center">
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
        <div className=" ml-4">{userProfile.username}</div>
      </div>

      <div className="px-4 mt-2 flex items-center">
        <img
          src={userProfile.imageSrc}
          alt="Profile picture"
          className="rounded-full"
          style={{ width: "24vw" }}
        />

        <div className="flex justify-between items-center ml-8 w-full">
          <span className="text-center">
            <p className="font-medium">{posts.length}</p>
            <p className="text-sm">{posts.length === 1 ? "Post" : "Posts"}</p>
          </span>
          <span className="text-center">
            <p className="font-medium">{userProfile.followers.length}</p>
            <p className="text-sm">
              {userProfile.followers.length === 1 ? "Follower" : "Followers"}
            </p>
          </span>
          <span className="text-center">
            <p className="font-medium">{userProfile.following.length}</p>
            <p className="text-sm">Following</p>
          </span>
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={() => handleFollow()}
          className={`rounded-sm py-1 border ${
            !isFollowing
              ? "bg-secondary-hover hover:bg-secondary-hover border-secondary"
              : "bg-transparent border-gray-400"
          }`}
          style={{ width: "40vw" }}
        >
          {!isFollowing ? "Follow" : "Unfollow"}
        </button>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-3 mt-4 mb-16" style={{ gap: "2px" }}>
          {posts.map((post) => (
            <Link
              href={`/p/${userProfile.username}/posts?post=${post._id}`}
              key={post._id}
            >
              <img
                src={post.imageSrc}
                alt=""
                className="object-cover"
                style={{ height: "33.33vw", width: "33.33vw" }}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center w-full mt-4">
          <h1 className="text-xl">No posts yet.</h1>
        </div>
      )}
    </div>
  );
};

export default Profile;

export async function getServerSideProps(context) {
  const client = await clientPromise;

  const db = client.db();
  const { username } = context.query;

  const { req } = context;
  const session = await getSession({ req });

  const userProfile = await db.collection("users").find({ username }).toArray();

  const { user } = await useUser(session);

  const userPosts = await db
    .collection("posts")
    .find({ username })
    .sort({ dateCreated: -1 })
    .toArray();

  return {
    props: {
      userProfile:
        userProfile.length > 0
          ? JSON.parse(JSON.stringify(userProfile[0]))
          : null,
      user,
      posts: JSON.parse(JSON.stringify(userPosts)),
    }, //Only pass prop if there's a user
  };
}

Profile.requireAuth = true;
