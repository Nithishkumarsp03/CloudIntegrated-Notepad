import * as React from "react";

const Link = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={"1.5em"}
        height={"1.5em"}
        fill="none"
        viewBox="0 0 16 16"
        style={{
            transition: "all 0s ease-in-out",
            ...props.style
        }}
        {...props}
    >
        <g
            fill="currentColor"
            style={{
                transition: "fill 0.1s ease-in-out",
                stroke: "none"
            }}
        >
            <path
                d="M7.05 1.536a5.243 5.243 0 0 1 7.414 7.414L12.415 11 11 9.586l2.05-2.05A3.243 3.243 0 0 0 8.464 2.95L6.414 5 5 3.586l2.05-2.05ZM7.536 13.05 9.586 11 11 12.414l-2.05 2.05A5.243 5.243 0 0 1 1.536 7.05L3.586 5 5 6.414l-2.05 2.05a3.243 3.243 0 0 0 4.586 4.586Z"
                style={{ transition: "fill 0.1s ease-in-out" }}
            />
            <path
                d="m5.707 11.707 6-6-1.414-1.414-6 6 1.414 1.414Z"
                style={{ transition: "fill 0.1s ease-in-out" }}
            />
        </g>
    </svg>
);

export default Link;