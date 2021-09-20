import { signOut } from "next-auth/client";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import useUser from "../../hooks/useUser";
import ReactLoading from "react-loading";
import clientPromise from "../../lib/mongodb";

const Profile = ({ userProfile }) => {
  const router = useRouter();
  const { user } = useUser();

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

  if (!userProfile) {
    return (
      <>
        <h1>User not found</h1>
      </>
    );
  }

  return (
    <div className=" px-3 py-4">
      <div className="flex items-center">
        <button className="" onClick={() => router.back()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#fff"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <div className=" ml-4">{userProfile.username}</div>
      </div>
    </div>
  );
};

export default Profile;

export async function getServerSideProps(context) {
  const client = await clientPromise;

  const db = client.db();
  const { username } = context.query;

  const user = await db.collection("users").find({ username }).toArray();

  return {
    props: {
      userProfile: user.length > 0 ? JSON.parse(JSON.stringify(user[0])) : null,
    }, //Only pass prop if there's a user
  };
}

Profile.requireAuth = true;
