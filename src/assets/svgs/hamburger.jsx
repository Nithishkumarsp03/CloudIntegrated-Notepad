import * as React from "react"
const HamburgerIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={props.fill}
        viewBox="0 0 24 24"
        {...props}
    >
        <g fill="#1C274C" fillRule="evenodd" clipRule="evenodd">
            <path d="M20.75 7a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75ZM20.75 12a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75ZM20.75 17a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75Z" />
        </g>
    </svg>
)
export default HamburgerIcon; 