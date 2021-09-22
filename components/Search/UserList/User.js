import Link from "next/link";
import { useState } from "react";

const User = ({ user, handleFollow, isFollowing }) => {
  const [toggleFollow, setToggleFollow] = useState(isFollowing);

  return (
    <div className="border border-gray-800 flex items-center w-full justify-between p-2 mb-2">
      <div className="flex items-center space-x-1">
        <Link href={`/p/${user.username}`}>
          <img
            src={user.imageSrc}
            alt="user profile"
            className="rounded-full h-7 w-7 "
          />
        </Link>
        <Link href={`/p/${user.username}`}>
          <p className="font-medium">{user.username}</p>
        </Link>
      </div>

      <button
        onClick={() => {
          handleFollow(user);
          setToggleFollow(!toggleFollow);
        }}
        className="text-secondary font-medium text-sm"
      >
        {!toggleFollow ? "Follow" : "Unfollow"}
      </button>
    </div>
  );
};

export default User;
