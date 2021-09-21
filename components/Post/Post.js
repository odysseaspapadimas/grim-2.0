import { formatDistance, parseISO } from "date-fns";
import Link from "next/link";
import { useRef, useState } from "react";
import Actions from "./Actions";
import Comments from "./Comments";
import useDoubleClick from "use-double-click";
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

  const handleDoubleTap = () => {
    console.log("Like");
  };

  const bind = useDoubleTap((event) => {
    // Your action here
    console.log("Double tapped");
  });

  return (
    <div className="flex flex-col mb-3">
      <div className="flex items-center px-2">
        <img
          className="rounded-full h-7 w-7 pointer-events-auto"
          style={{ pointerEvents: "all" }}
          src={avatarSrc}
          alt="profile"
        />

        <Link href={`/p/${username}`}>
          <p className="font-medium ml-2">{username}</p>
        </Link>
      </div>
      <img {...bind} className="my-2" src={imageSrc} alt="mountains" />
      <div className="px-2">
        <Actions
          postId={postId}
          myUsername={myUsername}
          hasLiked={likes.includes(myUsername) ? true : false}
          setLikeCount={setLikeCount}
        />
        <p className="text-sm">
          {likeCount} {likeCount === 1 ? "like" : "likes"}
        </p>
        <div className="flex items-center">
          <Link href={`/p/${username}`}>
            <p className="font-medium mr-1">{username}</p>
          </Link>
          <p> {caption}</p>
        </div>
        <Comments
          allComments={comments}
          myUsername={myUsername}
          postId={postId}
        />
        <p className="text-xs text-gray-500">
          {formatDistance(parseISO(date), new Date())} ago
        </p>
      </div>
    </div>
  );
};

export default Post;
