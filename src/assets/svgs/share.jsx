import * as React from "react"
const SvgComponent = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={'1.5em'}
        height={'1.5em'}
        {...props}
    >
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M20 5.5a3.5 3.5 0 0 1-5.845 2.598l-5.269 3.513a3.506 3.506 0 0 1 0 1.778l4.718 3.145A3.5 3.5 0 1 1 13 18.535l-5.155-3.437a3.5 3.5 0 1 1 0-5.197l5.269-3.512A3.5 3.5 0 1 1 20 5.5ZM16.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm-11 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM18 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
            clipRule="evenodd"
        />
    </svg>
)
export default SvgComponent
