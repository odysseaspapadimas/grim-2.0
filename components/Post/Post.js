import { formatDistance, parseISO } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import Actions from "./Actions";
import Comments from "./Comments";
import { useDoubleTap } from "use-double-tap";

const Post = ({
  postId,
  username,
  avatarSrc,
  imageSrc,
  caption,
  likes,
  comments,
  date,
  myUsername,
}) => {
  const [likeCount, setLikeCount] = useState(likes.length);

  const [toggleLiked, setToggleLiked] = useState(
    likes.includes(myUsername) ? true : false
  );

  const [showAnimation, setShowAnimation] = useState(false);

  const handleToggleLiked = async (toggle) => {
    setToggleLiked(toggle);

    setLikeCount((likeCount) => (toggle ? likeCount + 1 : likeCount - 1));

    const res = await fetch("/api/posts/toggleLike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
        username: myUsername,
        toggleLiked,
      }),
    });
  };

  const bind = useDoubleTap((event) => {
    // Your action here
    //like animation activation
    if (!toggleLiked) {
      //setLikeCount((likeCount) => likeCount + 1);
      handleToggleLiked(!toggleLiked);
    }
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 2000);
  });

  return (
    <div className="flex flex-col my-2">
      <div className="flex items-center py-1 px-2">
        <img className="rounded-full h-7 w-7 " src={avatarSrc} alt="profile" />

        <Link href={`/p/${username}`}>
          <p className="font-medium ml-2">{username}</p>
        </Link>
      </div>
      <div className="flex justify-center items-center relative">
        <img
          {...bind}
          className="my-2 w-screen"
          src={imageSrc}
          alt="mountains"
        />
        {showAnimation && (
          <svg
            className="text-red-500 absolute w-24 animate-ping-long"
            xmlns="http://www.w3.org/2000/svg"
            fill="#ef4444"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        )}
      </div>
      <div className="px-2">
        <Actions
          postId={postId}
          myUsername={myUsername}
          hasLiked={likes.includes(myUsername) ? true : false}
          setLikeCount={setLikeCount}
          toggleLiked={toggleLiked}
          handleToggleLiked={handleToggleLiked}
        />
        <p className="text-sm">
          {likeCount} {likeCount === 1 ? "like" : "likes"}
        </p>
        <div className="flex items-center">
          <Link href={`/p/${username}`}>
            <p className="font-medium mr-1">{username}</p>
          </Link>
          <p className="text-sm"> {caption}</p>
        </div>
        {comments.length > 0 && (
          <div className="text-center py-1 w-full flex justify-center items-center">
            <div className="border-b border-gray-700  w-11/12 "></div>
          </div>
        )}
        <Comments
          allComments={comments}
          myUsername={myUsername}
          postId={postId}
        />
        <p className="text-xs text-gray-500 mt-1">
          {formatDistance(parseISO(date), new Date())} ago
        </p>
      </div>
    </div>
  );
};

export default Post;
