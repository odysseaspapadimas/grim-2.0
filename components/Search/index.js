import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { useEffect, useState } from "react";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const res = await fetch("/api/user/allUsers");
    const { users } = await res.json();
    console.log(users);
    setUsers(users);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <span className="flex justify-center items-center ">
        <InputGroup m={6} w={"full"}>
          <InputLeftElement
            pointerEvents="none"
            children={
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="#fff"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            }
          />
          <Input placeholder="Search" />
        </InputGroup>
      </span>

      <div className="flex flex-col justify-center items-center">
          {users && users.map((user) => (
              <p key={user._id}>{user.username}</p>
          ))}
      </div>
    </div>
  );
};

export default Search;

Search.requireAuth = true;
