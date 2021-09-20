import { useState } from "react";
import AddComment from "./AddComment";
import Link from "next/link";

const Comments = ({ allComments, myUsername, postId }) => {
  const [comments, setComments] = useState(allComments);

  const [viewAllComments, setViewAllComments] = useState(false);

  return (
    <div className="">
      {comments.length > 3 && (
        <button
          onClick={() => setViewAllComments(!viewAllComments)}
          className="text-sm text-gray-600 mb-1 cursor-pointer"
        >
          {!viewAllComments
            ? ` View all ${comments.length} comments`
            : `Collapse comments`}
        </button>
      )}
      {!viewAllComments
        ? comments.slice(-3).map((comment, i) => (
            <div key={comment + i} className="flex items-center space-x-2">
              <Link href={`/p/${comment.username}`}>
                <p className="font-medium">{comment.username}</p>
              </Link>
              <p>{comment.content}</p>
            </div>
          ))
        : comments.map((comment, i) => (
            <div key={comment + i} className="flex items-center space-x-2">
              <Link href={`/p/${comment.username}`}>
                <p className="font-medium">{comment.username}</p>
              </Link>
              <p>{comment.content}</p>
            </div>
          ))}
      <AddComment
        myUsername={myUsername}
        postId={postId}
        setComments={setComments}
      />
    </div>
  );
};

export default Comments;
