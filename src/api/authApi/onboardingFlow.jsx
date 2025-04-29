import axios from "axios";
import { AUTH_URL } from "../globalApi";
import { useLoginStore } from "../../store/loginStore";

export const OnboardingFlow = async () => {
    const { onChangeLoaders } = useLoginStore.getState(); 
    try {
        onChangeLoaders("isFlowLoading", true);
        const response = await axios.get(`${AUTH_URL}/fetchcategory`);
        return { state: true, data: response.data };
    }
    catch (err) {
            return { state: false ,response:"Some error occured.Try again"};
    }
    finally {
        onChangeLoaders("isFlowLoading", false);
    }
};