import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import useUser from "../../../hooks/useUser";
import ReactLoading from "react-loading";
import Link from "next/link";
import { useState, useEffect } from "react";
import useSWR from "swr";
import fetcher from "../../../helpers/fetcher";

const Profile = () => {
  const router = useRouter();
  const [session] = useSession();
  const [user, setUser] = useState({});

  const [isFollowing, setIsFollowing] = useState();

  const { data: userProfile, error } = useSWR(
    `/api/user/username/${router.query.username}`,
    fetcher
  );
  const { data: posts, error: postsError } = useSWR(
    `/api/user/profileData?q=${router.query.username}`,
    fetcher
  );

  useEffect(() => {
    if (!session) return;
    const fetchUser = async () => {
      const { user } = await useUser(session);
      setUser(user);
    };
    fetchUser();
  }, [session]);

  useEffect(() => {
    if (!user.username) return;
    setIsFollowing(user.following.includes(userProfile.username));
  }, [user]);

  if ((!user && !error) || !userProfile || !posts) {
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

  if (userProfile && userProfile.length === 0) {
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
    <div className="py-4">
      <div className="flex items-center ml-4">
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
            <p className="font-medium">{posts ? posts.length : "0"}</p>
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

Profile.requireAuth = true;
