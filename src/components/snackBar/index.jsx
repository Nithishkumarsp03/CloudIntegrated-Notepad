import { CloseOutlined } from "@mui/icons-material";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export const Snackbar = ({ message, variant = "info", open, onClose }) => {
    const toastShownRef = useRef(false);

    const variants = {
        success: "bg-emerald-50 text-emerald-900 border border-emerald-200",
        error: "bg-rose-50 text-rose-900 border border-rose-200",
        warning: "bg-amber-50 text-amber-900 border border-amber-200",
        info: "bg-sky-50 text-sky-900 border border-sky-200",
        neutral: "bg-gray-50 text-gray-900 border border-gray-200",
    };

    useEffect(() => {
        if (open && !toastShownRef.current) {
            toastShownRef.current = true;

            toast.custom((t) => (
                <div
                    onClick={() => {
                        toast.dismiss(t.id);
                        toastShownRef.current = false;
                        if (onClose) onClose();
                    }}
                    className={`cursor-pointer p-4 min-w-[300px] flex items-center justify-between gap-2 shadow rounded text-sm ${variants[variant]}`}
                >
                    <span>{message}</span>
                    <CloseOutlined fontSize="small" />
                </div>
            ), {
                duration: 5000,
                onAutoClose: () => {
                    toastShownRef.current = false;
                    if (onClose) onClose();
                },
            });
        }
    }, [open, message, variant, onClose]);

    return null;
};
