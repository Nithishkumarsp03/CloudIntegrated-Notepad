import axios from "axios";
import { useLoginStore } from "../../store/loginStore";
import { AUTH_URL } from "../globalApi";

export const TwoStepAuth = async (otp) => {
    const { email, otpToken, onChange, onChangeLoaders } = useLoginStore.getState();
    const persistStorage = useLoginStore(e => e.persistStorage);

    try {
        onChangeLoaders("isTwoStepLoading", true);
        const response = await axios.post(
            `${AUTH_URL}/check-otp`,
            {
                email: email,
                otp: otp,
                otpToken: otpToken
            },
            {
                headers: {
                    authorization: `Bearer ${otpToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const userData = response?.data?.userData;
        const token = response?.data?.token;
        persistStorage("token", token);
        persistStorage("userName", userData?.name);
        persistStorage("gender", userData?.gender);
        persistStorage("loginId", userData?.id);
        onChange("token", token);
        onChange("userName", userData?.name);
        onChange("gender", userData?.gender);
        onChange("loginId", userData?.id);

        return { state: true };

    } catch (err) {
        return {
            state: false,
            message: err?.response?.data?.message || "Some error occurred. Try again."
        };
    } finally {
        onChangeLoaders("isTwoStepLoading", false);
        onChange("firstLogin", false);
    }
};
