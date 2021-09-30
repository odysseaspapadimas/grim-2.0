import { Input } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const signup = () => {
  const [username, setUsername] = useState("");
  const [session] = useSession();
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);

  const router = useRouter();

  const handleForm = async (e) => {
    console.log("helloooo");
    setDisabled(true);
    e.preventDefault();

    const res = await fetch("/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email: session.user.email,
        fullName: session.user.name,
      }),
    });
    console.log(res);
    if (res.status === 201) {
      router.push("/");
    } else {
      const { error } = await res.json();
      setError(error);
      setDisabled(false);
    }
  };

  const handleInput = (e) => {
    if (e.target.value.length <= 10) {
      setUsername(e.target.value.toLowerCase().replace(/\s/g, "")); //to lower case and remove spaces
    }
  };

  return (
    <div className="flex min-w-screen min-h-screen justify-center items-center">
      <form
        onSubmit={handleForm}
        action="POST"
        className="border border-gray-600 flex flex-col items-center h-full py-4"
        style={{ width: "80vw" }}
      >
        <h1 className="text-xl font-semibold">Grim</h1>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <h3>Choose a username:</h3>
        <span className="mt-1">
          <Input
            onChange={handleInput}
            value={username}
            placeholder="Username"
            size={"sm"}
          />
        </span>
        <button
          className="px-3 py-2 rounded-sm mt-2 bg-secondary hover:bg-secondary-hover"
          disabled={disabled}
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default signup;
