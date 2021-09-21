import { useState } from "react";

const AddComment = ({ myUsername, postId, setComments }) => {
  const [comment, setComment] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    setComments((comments) => {
      if (comments) {
        return [
          ...comments,
          {
            username: myUsername,
            content: comment,
            dateCreated: new Date(Date.now()).toISOString(),
          },
        ];
      } else {
        return [
          {
            username: myUsername,
            content: comment,
            dateCreated: new Date(Date.now()).toISOString(),
          },
        ];
      }
    });
    setComment("");

    const res = await fetch("/api/posts/addComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment,
        username: myUsername,
        dateCreated: new Date(Date.now()).toISOString(),
        postId,
      }),
    });
  };

  return (
    <div className="">
      <form
        action="POST"
        onSubmit={handleForm}
        className="flex items-center justify-between"
      >
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Add a comment..."
          className="bg-transparent border outline-none border-gray-800 focus:border-secondary w-full mr-3 py-2 px-3"
        />
        <div className="text-center mr-2">
          <button
            type="submit"
            disabled={comment.length < 2}
            className={`${
              comment.length < 2 ? "text-secondary-hover " : "text-secondary "
            }font-medium text-sm`}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
