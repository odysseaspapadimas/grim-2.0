import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import ReactLoading from "react-loading";

import FileBase64 from "react-file-base64";
import { useToast } from "@chakra-ui/react";

const CreatePost = ({ user, setTab }) => {
  const toast = useToast();

  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const inputRef = useRef();

  const handleForm = async (e) => {
    setIsUploading(true);
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "parea_app");
    data.append("cloud_name", "odysseas");

    const cloudRes = await fetch(
      " https://api.cloudinary.com/v1_1/odysseas/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const cloudResponse = await cloudRes.json();
    const { secure_url } = cloudResponse;
    console.log(cloudResponse);

    console.log(cloudRes);
    if (cloudRes.status !== 200) {
      toast({
        title: "Oh oh.",
        description: "Something went wrong... Try again...maybe?",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsUploading(false);
      return;
    }
    const res = await fetch("/api/posts/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatarSrc:
          "https://i.pinimg.com/280x280_RS/2d/1e/e7/2d1ee7840c61457443e91e29b7c3af9a.jpg",
        caption,
        comments: [],
        likes: [],
        imageSrc: secure_url,
        username: "luffy",
        dateCreated: new Date(Date.now()).toISOString(),
      }),
    });

    setImage("");
    setCaption("");
    inputRef.current.value = null;

    if (res.status === 201) {
      toast({
        title: "Post created.",
        description: "Successfully created your post.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setIsUploading(false);
    }
  };

  if (!user) {
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

  return (
    <div className="relative flex flex-col justify-center items-center py-3 mb-14">
      <button
        className="absolute top-3 left-4"
        onClick={() => setTab({ selection: "feed" })}
      >
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h1 className="text-lg border-b-2 border-white">New post</h1>
      <form
        action="POST"
        onSubmit={handleForm}
        className="flex flex-col justify-center items-center"
      >
        <div className="my-4">
          <input
            ref={inputRef}
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div
          className="flex flex-col justify-center items-center border border-gray-400 rounded-sm w-full"
          style={{ height: `${image ? "100%" : "42vh"}` }}
        >
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="uploaded image"
              className="w-full h-full"
            />
          )}
        </div>

        <div className="my-2 px-10">
          <h1>Add a caption:</h1>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="bg-transparent border outline-none border-gray-400 focus:border-secondary w-full mr-3 py-2 px-3"
          />
        </div>

        <button
          type="submit"
          className="px-10 my-2 py-3 bg-secondary hover:bg-secondary-hover"
        >
          Post
        </button>
      </form>
      {isUploading && (
        <div>
          <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black opacity-70"></div>
          <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
            <div className="p-20 text-center bg-white">
              <h1 className="text-black text-lg font-medium">Uploading...</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;

CreatePost.requireAuth = true;
