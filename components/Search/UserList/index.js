import { useState, useEffect } from "react";
import User from "./User";
import ReactLoading from "react-loading";

const UserList = ({ search, myUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const res = await fetch("/api/user/allUsers");
    const users = await res.json();
    console.log(users);
    setUsers(users);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFollow = async (userToFollow) => {
    const res = await fetch("/api/user/followUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        myUsername: myUser.username,
        userToFollow: userToFollow.username,
        unfollow: myUser.following.includes(userToFollow.username),
      }),
    });
  };

  if (loading) {
    <div className="flex justify-center items-center">
      <ReactLoading type={"spin"} color={"#fff"} height={"20%"} width={"20%"} />
    </div>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {users && search
        ? users
            .filter(
              (user) =>
                user.username.toLowerCase().includes(search.toLowerCase()) &&
                user.username !== myUser.username
            )
            .map((user) => (
              <User
                key={user.username}
                user={user}
                handleFollow={handleFollow}
                isFollowing={myUser.following.includes(user.username)}
              />
            ))
        : users
            .filter((user) => user.username !== myUser.username)
            .map((user) => (
              <User
                key={user.username}
                user={user}
                handleFollow={handleFollow}
                isFollowing={myUser.following.includes(user.username)}
              />
            ))}
    </div>
  );
};

export default UserList;
