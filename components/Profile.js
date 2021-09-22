import { signOut } from "next-auth/client";
import { useEffect, useState } from "react";

const Profile = ({ user }) => {
  const [postAmount, setPostAmount] = useState(0);
  const [posts, setPosts] = useState([]);

  const fetchProfileData = async () => {
    const res = await fetch(`/api/user/profileData?q=${user.username}`);

    const { userPosts, postAmount } = await res.json();

    setPosts(userPosts);
    setPostAmount(postAmount);
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div>
      <button className="fixed top-3 right-3 " onClick={signOut}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </button>
      <header className="px-4 mt-2">
        <h1 className="text-xl font-semibold">{user.username}</h1>
      </header>

      <div className="px-4 mt-2 flex items-center">
        <img
          src={user.imageSrc}
          alt="Profile picture"
          className="rounded-full"
          style={{ width: "24vw" }}
        />

        <div className="flex justify-between items-center ml-8 w-full">
          <span className="text-center">
            <p className="font-medium">{postAmount}</p>
            <p className="text-sm">{postAmount === 1 ? "Post" : "Posts"}</p>
          </span>
          <span className="text-center">
            <p className="font-medium">{user.followers.length}</p>
            <p className="text-sm">
              {user.followers.length === 1 ? "Follower" : "Followers"}
            </p>
          </span>
          <span className="text-center">
            <p className="font-medium">{user.following.length}</p>
            <p className="text-sm">Following</p>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 mt-4" style={{ gap: "2px" }}>
        {posts.length > 0 &&
          posts.map((post) => (
            <div>
              <img
                src={post.imageSrc}
                alt=""
                className="object-cover"
                style={{ height: "33.33vw", width: "33.33vw" }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
