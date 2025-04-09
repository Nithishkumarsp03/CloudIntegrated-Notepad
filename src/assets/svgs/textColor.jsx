import * as React from "react"
const TextColor = (props) => (
    <svg
        className="border-2 border-gray-300 rounded-md p-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        stroke="black"
        viewBox="0 0 1920 1920"
        width={'1.8em'}
    height={'1.8em'}
        {...props}
    >
        <path
            fillRule="currentColor"
            d="m928.806 512-185.984 512h434.304L991.142 512h-62.336Zm419.072 981.875-124.16-341.888h-527.36L572.07 1493.875 451.878 1450.1 839.206 383.987h241.664l387.2 1066.112-120.192 43.776ZM1728.038-.013h-1536c-105.856 0-192 86.144-192 192v1536c0 105.856 86.144 192 192 192h1536c105.856 0 192-86.144 192-192v-1536c0-105.856-86.144-192-192-192Z"
        />
    </svg>
)
export default TextColor;
