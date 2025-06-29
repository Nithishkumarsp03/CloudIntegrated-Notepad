import { Navbar } from "../components/navbar";
import { cn } from "../components/cn";
import Texteditor from "../components/editor";
import { Appbar } from "../components/appbar";
import { useNavbarStore } from "../store/navbarStore";

const Main = () => {
  const isSidebarOpen = useNavbarStore(e => e.isSidebarOpen);
  const noteId = useNavbarStore(e => e.noteId);

  return (
    <div className="flex flex-col h-screen dark:bg-gray-900 w-full overflow-hidden relative">
      <Appbar noteId={noteId} />
      <div className="flex flex-1 overflow-hidden relative">
        <Navbar />
        <div className={cn(
          "h-full p-4 pb-2 transition-all w-full duration-300 ease-in-out",
          {
            'w-[calc(100%-17rem)]': !isSidebarOpen,
          }
        )}>
          <Texteditor noteId={noteId} />
        </div>
      </div>
    </div>
  );
};

export default Main;