import { signOut } from "next-auth/client";

const Profile = ({ user }) => {
  return (
    <div>
      {user && user.username}
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default Profile;
