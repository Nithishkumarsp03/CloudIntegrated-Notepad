import * as React from "react";

const BoldIcon = ({ fill = "#000" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
        style={{ transition: "0.3s linear" }} 
    >
        <path
            fill={fill}
            fillRule="evenodd"
            d="M4 1a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1v-1 1h8a5 5 0 0 0 1.745-9.687A5 5 0 0 0 10 1H4zm6 8a3 3 0 1 0 0-6H5v6h5zm-5 2v6h7a3 3 0 1 0 0-6H5z"
            style={{ transition: "fill 0.3s ease-in-out" }} 
        />
    </svg>
);

export default BoldIcon;
