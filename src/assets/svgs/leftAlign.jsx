import * as React from "react";

const LeftAlign = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon flat-line"
        data-name="Flat Line"
        viewBox="0 0 24 24"
        width={"2em"}
        height={"2em"}
        style={{
            transition: "all 0s ease-in-out",
            ...props.style
        }}
        {...props}
    >
        <path
            d="M3 12h14M3 6h18M3 18h18"
            style={{
                fill: "none",
                stroke: "currentcolor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 1,
                transition: "stroke 0.3s ease-in-out, fill 0.3s ease-in-out"
            }}
        />
    </svg>
);

export default LeftAlign;