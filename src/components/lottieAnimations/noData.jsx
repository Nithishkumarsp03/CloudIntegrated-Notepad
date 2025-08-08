
import Lottie from "lottie-react";
import animationData from "../../no data.json"

export const NoData = () => {
    return (
        <div className="w-64 h-64">
            <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
            />
        </div>
    );
}
