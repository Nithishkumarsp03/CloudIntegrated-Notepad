import { Skeleton } from "@mui/material";

const TextEditorSkeleton = () => {
    return (
        <div className='w-full h-full flex flex-col gap-4'>
            <div className="flex-grow overflow-auto h-full w-full text-wrap whitespace-break-spaces dark:bg-gray-800 bg-gray-50 border border-gray-300 dark:border-gray-800 rounded-lg p-4">
                <Skeleton variant="rectangular" width="100%" height={24} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" width="90%" height={20} sx={{ mb: 1.5 }} />
                <Skeleton variant="rectangular" width="95%" height={20} sx={{ mb: 1.5 }} />
                <Skeleton variant="rectangular" width="85%" height={20} sx={{ mb: 1.5 }} />
                <Skeleton variant="rectangular" width="70%" height={20} sx={{ mb: 3 }} />

                <Skeleton variant="rectangular" width="100%" height={24} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" width="88%" height={20} sx={{ mb: 1.5 }} />
                <Skeleton variant="rectangular" width="92%" height={20} sx={{ mb: 1.5 }} />
                <Skeleton variant="rectangular" width="79%" height={20} sx={{ mb: 3 }} />

                <Skeleton variant="rectangular" width="65%" height={20} sx={{ mb: 1.5 }} />
                <Skeleton variant="rectangular" width="82%" height={20} sx={{ mb: 1.5 }} />
            </div>
        </div>
    );
};

export default TextEditorSkeleton;