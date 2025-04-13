import React, { useMemo } from 'react';
import { Add } from '@mui/icons-material';
import useEditorStore from '../globalStore';
import RenameModal from '../components/renameModel';
import { cn } from '../components/cn';
import { ButtonComponent } from '../components/button';
import NotePad from '../assets/svgs/notePad';
import { useNavigate } from 'react-router-dom';

const EmptyStatePage = () => {
    const [newNoteModal, setNewNoteModal] = React.useState(false);
    const { darkMode, addNewTab } = useEditorStore();
    const navigate = useNavigate();

    const handleCreateNote = (noteName) => {
        if (noteName && noteName.trim() !== '') {
            addNewTab(noteName);
            setNewNoteModal(false);
            navigate('/texteditor/1')
        }
    };


    const BackgroundPattern = useMemo(() => {
        return () => (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className={`absolute top-40 left-20 transform rotate-12 opacity-5 ${darkMode ? 'text-purple-400' : 'text-gray-900'}`}>
                    <NotePad className="w-20 h-20" />
                </div>
                <div className={`absolute bottom-40 right-40 transform -rotate-12 opacity-5 ${darkMode ? 'text-purple-400' : 'text-gray-900'}`}>
                    <NotePad className="w-16 h-16" />
                </div>
            </div>
        );
    }, [darkMode]);

    return (
        <div className="relative flex flex-col items-center justify-center h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Large Circle */}
                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-200/20 dark:bg-purple-900/10 blur-xl"></div>


                <BackgroundPattern />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzlBQThCOCIgb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-70 dark:opacity-20"></div>

                {/* Floating Dots */}
                <div className="absolute top-28 right-1/4 w-2 h-2 rounded-full bg-blue-500/40 dark:bg-purple-500/40"></div>
                <div className="absolute top-36 right-1/3 w-1.5 h-1.5 rounded-full bg-purple-500/40 dark:bg-blue-400/40"></div>
                <div className="absolute bottom-28 left-1/4 w-2 h-2 rounded-full bg-purple-500/40 dark:bg-blue-500/40"></div>
                <div className="absolute bottom-36 left-1/3 w-1.5 h-1.5 rounded-full bg-blue-500/40 dark:bg-purple-400/40"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-md px-4 py-8 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                <div className="mb-6">
                    <svg
                        className="w-24 h-24 mx-auto mb-4 text-blue-500 dark:text-purple-400 drop-shadow-md"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect x="20" y="10" width="60" height="80" rx="4" fill="currentColor" fillOpacity="0.1" />
                        <rect x="30" y="25" width="40" height="3" rx="1.5" fill="currentColor" />
                        <rect x="30" y="35" width="30" height="3" rx="1.5" fill="currentColor" />
                        <rect x="30" y="45" width="35" height="3" rx="1.5" fill="currentColor" />
                        <rect x="30" y="55" width="25" height="3" rx="1.5" fill="currentColor" />
                        <path d="M75 72.5C75 79.4036 69.4036 85 62.5 85C55.5964 85 50 79.4036 50 72.5C50 65.5964 55.5964 60 62.5 60C69.4036 60 75 65.5964 75 72.5Z" fill="currentColor" fillOpacity="0.2" />
                        <path d="M63 67V78M57.5 72.5H68.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>

                    <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                        No Notes Yet
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Create your first note to get started with your text editor.
                    </p>
                </div>

                <ButtonComponent
                    btnText="Create New Note"
                    startIcon={<Add />}
                    handleClick={() => setNewNoteModal(true)}
                    styles={{
                        width: "fit-content",
                        height: "44px",
                        backgroundColor: darkMode ? "#7C3AED" : "#2563EB",
                        color: "white",
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        "&:hover": {
                            backgroundColor: darkMode ? "#6D28D9" : "#3B82F6",
                            boxShadow: "0 4px 12px rgba(79, 70, 229, 0.2)"
                        },
                        "&:active": {
                            backgroundColor: darkMode ? "#5B21B6" : "#1D4ED8"
                        }
                    }}
                />

                <div className="mt-12 px-4">
                    <div className={cn(
                        "flex items-center p-4 rounded-lg border",
                        "bg-blue-50/80 border-blue-100 dark:bg-gray-700/50 dark:border-purple-900/50 backdrop-blur-sm"
                    )}>
                        <div className="flex-shrink-0 mr-3">
                            <svg className="w-5 h-5 text-blue-500 dark:text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="text-sm text-blue-700 dark:text-purple-200">
                            Your notes are saved automatically as you type. Create a note to start writing.
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative z-10 mt-8 text-center max-w-xs">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Start organizing your thoughts with our powerful text editor. Format text, add lists, and more.
                </p>
            </div>

            {/* Animated Line Elements */}
            <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-blue-300/20 via-purple-300/20 to-blue-300/20 dark:from-blue-800/10 dark:via-purple-700/10 dark:to-blue-800/10"></div>
            <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-purple-300/20 via-blue-300/20 to-purple-300/20 dark:from-purple-700/10 dark:via-blue-800/10 dark:to-purple-700/10"></div>

            <RenameModal
                open={newNoteModal}
                onClose={() => setNewNoteModal(false)}
                heading="Create New Note"
                placeholder="Enter Note Name"
                onRename={handleCreateNote}
            />
        </div>
    );
};

export default EmptyStatePage;