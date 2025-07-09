import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useEditorStore from "../store/globalStore";
import { useNavbarStore } from "../store/navbarStore";
import { BackgroundDecorations, BackgroundPattern, EmptyStateContent, Footer, PageBorders } from "../components";
import { useLoginStore } from "../store/loginStore";
import secureLocalStorage from "react-secure-storage";

const EmptyStatePage = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = useLoginStore(e => e.isUserLoggedIn);

  useEffect(() => {
    if (isUserLoggedIn) {
      let data = JSON.parse(secureLocalStorage.getItem("notes"));
      if (data) {
        const uuid = data[0]?.uuid;
        if (uuid) {
          navigate(`/note-pad/${uuid}`);
        }
      }
    }
  }, []);


  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <BackgroundDecorations />
        <BackgroundPattern />
      </div>

      <EmptyStateContent
      />

      <Footer />
      <PageBorders />
    </div>
  );
};

export default EmptyStatePage;