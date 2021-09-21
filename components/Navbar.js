import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = ({ user, tab, setTab }) => {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 flex items-center justify-around w-screen py-3 bg-primary border-t border-gray-600">
      <div onClick={() => setTab({ selection: "feed" })}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill={`${tab.selection === "feed" ? "#fff" : "hsl(210, 21%, 5%)"}`}
          stroke="#fff"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </div>
      <div onClick={() => setTab({ selection: "search" })}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="#fff"
          stroke={`${tab.selection === "search" && "#fff"} `}
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div onClick={() => setTab({ selection: "create" })}>+</div>
      <div onClick={() => setTab({ selection: "notifications" })}>Not</div>
      <div onClick={() => setTab({ selection: "profile" })}>
        <img
          src={user.imageSrc}
          alt="profile"
          width="26px"
          height="26px"
          className={`rounded-full ${
            tab.selection === "profile" && "border-2 border-solid border-white"
          }`}
        />
      </div>
    </div>
  );
};

export default Navbar;
