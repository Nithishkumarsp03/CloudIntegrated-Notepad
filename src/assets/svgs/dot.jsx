import * as React from "react"
export const Dot = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={12}
        height={12}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <path fill="#93A3AF" d="M12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" />
    </svg>
)
