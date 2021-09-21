import { useEffect, useState } from "react";

const Actions = ({
  postId,
  myUsername,
  hasLiked,
  setLikeCount,
  toggleLiked,
  handleToggleLiked,
}) => {
  //my myUsername

  return (
    <div>
      <div className="flex items-center">
        <svg
          onClick={() => handleToggleLiked(!toggleLiked)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleToggleLiked(!toggleLiked);
            }
          }}
          className={`w-8 -ml-1 mr-4 select-none cursor-pointer ${
            toggleLiked ? "fill-current text-red-500" : "text-primary"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke={`${toggleLiked ? "text-red-500" : "#fff"}`}
          fill="bg-primary"
          tabIndex={0}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Actions;
