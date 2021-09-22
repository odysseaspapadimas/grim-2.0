import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { InputRightElement } from "@chakra-ui/react";
import { useRef, useState } from "react";
import UserList from "./UserList";

const Search = ({ user }) => {
  const [search, setSearch] = useState("");
  const inputRef = useRef();

  return (
    <div className="p-4">
      <span className="flex justify-center items-center mb-3">
        <InputGroup w={"full"}>
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
          <Input
            placeholder="Search"
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputRightElement
            onClick={() => {
              setSearch("");
              inputRef.current.focus();
            }}
            children={
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
              </>
            }
          />
        </InputGroup>
      </span>

      <UserList search={search} myUser={user} />
    </div>
  );
};

export default Search;

Search.requireAuth = true;
