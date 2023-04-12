import React from "react";

const True = () => {
  return (
    <div>
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 2.5C8.125 2.5 2.5 8.125 2.5 15C2.5 21.875 8.125 27.5 15 27.5C21.875 27.5 27.5 21.875 27.5 15C27.5 8.125 21.875 2.5 15 2.5ZM12.5 21.25L6.25 15L8.0125 13.2375L12.5 17.7125L21.9875 8.225L23.75 10L12.5 21.25Z"
          fill="#2EF25A"
        />
      </svg>
    </div>
  );
};

const False = () => {
  return (
    <div>
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 2.5C21.9125 2.5 27.5 8.0875 27.5 15C27.5 21.9125 21.9125 27.5 15 27.5C8.0875 27.5 2.5 21.9125 2.5 15C2.5 8.0875 8.0875 2.5 15 2.5ZM19.4875 8.75L15 13.2375L10.5125 8.75L8.75 10.5125L13.2375 15L8.75 19.4875L10.5125 21.25L15 16.7625L19.4875 21.25L21.25 19.4875L16.7625 15L21.25 10.5125L19.4875 8.75Z"
          fill="#F24E1E"
        />
      </svg>
    </div>
  );
};

export { True, False };