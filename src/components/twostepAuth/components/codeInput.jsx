import React, { forwardRef } from "react";
import { cn } from "../../cn";

export const CodeInput = forwardRef(({
    index,
    value,
    onChange,
    onPaste,
    onKeyDown,
    darkMode
}, ref) => {
    return (
        <input
            ref={ref}
            type="text"
            maxLength={1}
            value={value}
            onChange={onChange}
            onPaste={onPaste}
            onKeyDown={onKeyDown}
            className={cn(
                "w-12 h-14 text-center text-xl font-medium",
                "bg-gray-50 dark:bg-gray-700",
                "text-gray-900 dark:text-gray-100",
                "border border-gray-300 dark:border-gray-600",
                "rounded-lg",
                "focus:outline-none focus:ring-2",
                "focus:ring-blue-500 dark:focus:ring-purple-500",
                "focus:border-blue-500 dark:focus:border-purple-500",
                "transition-all duration-200",
            )}
        />
    );
});
