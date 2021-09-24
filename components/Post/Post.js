import { formatDistance, parseISO } from "date-fns";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Actions from "./Actions";
import Comments from "./Comments";
import { useDoubleTap } from "use-double-tap";
import {
  useToast,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
  MenuItemOption,
  MenuOptionGroup,
} from "@chakra-ui/react";

const Post = ({
  postId,
  username,
  avatarSrc,
  imageSrc,
  caption,
  likes,
  comments,
  date,
  myUser: { username: myUsername, following: myFollowing },
  postFocus,
  setPosts,
}) => {
  const [likeCount, setLikeCount] = useState(likes.length);

  const [toggleLiked, setToggleLiked] = useState(
    likes.includes(myUsername) ? true : false
  );
  
  const [showAnimation, setShowAnimation] = useState(false);

  const postRef = useRef();

  const toast = useToast();

  useEffect(() => {
    if (!postFocus && !postRef.current) return;

    window.scrollTo({
      top: postRef?.current?.offsetTop,
    });
  }, [postFocus]);

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
    if (!toggleLiked) {
      handleToggleLiked(!toggleLiked);
    }
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 2000);
  });

  const handleDelete = async () => {
    const res = await fetch("/api/posts/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
      }),
    });

    if (res.status === 201) {
      toast({
        title: "Post delete",
        description: "Post was successfully deleted.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setPosts((prevPosts) => {
        return prevPosts.filter((prevPost) => {
          console.log(prevPost._id, postId, prevPost.postId === postId);
          return prevPost._id !== postId;
        });
      });
    }
  };

  return (
    <div
      className="flex flex-col my-2"
      ref={postFocus === postId ? postRef : null}
    >
      <div className="flex justify-between items-center py-1 px-2">
        <div className="flex items-center">
          <img
            className="rounded-full h-7 w-7 "
            src={avatarSrc}
            alt="profile"
          />

          <Link href={`/p/${username}`}>
            <p className="font-medium ml-2">{username}</p>
          </Link>
          {/* {username !== myUsername && myFollowing.includes(username) && (
            <button
              onClick={() => {
                //handleFollow(user);
                //setToggleFollow(!toggleFollow);
              }}
              className="text-secondary font-medium text-sm ml-2"
            >
              {!myFollowing.includes(username) && 'Follow'}
            </button>
          )} */}
        </div>
        {username === myUsername && (
          <Menu placement="bottom-end">
            <MenuButton
              as={IconButton}
              bgColor={"transparent"}
              icon={
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
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              }
              _focus={{ bgColor: "transparent" }}
              _hover={{ bgColor: "transparent" }}
              _expanded={{ bgColor: "transparent" }}
            ></MenuButton>
            <MenuList bgColor={"gray.800"} minWidth="240px">
              <MenuOptionGroup defaultValue="date" type="radio">
                <MenuItem
                  onClick={handleDelete}
                  _highlighted={{ bg: "secondary.100" }}
                  _focus={{ bg: "secondary.100" }}
                  _hover={{ bg: "secondary.100" }}
                  icon={
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  }
                >
                  Delete
                </MenuItem>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        )}
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
        {caption && (
          <div className="flex items-center">
            <Link href={`/p/${username}`}>
              <p className="font-medium mr-1">{username}</p>
            </Link>
            <p className="text-sm"> {caption}</p>
          </div>
        )}
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
