import axios from "axios";
import { useLoginStore } from "../../store/loginStore";

export const TwoStepAuth = async (otp) => {
    const { email, otpToken, onChange, onChangeLoaders } = useLoginStore.getState();

    try {
        onChangeLoaders("isTwoStepLoading", true);
        const response = await axios.post(
            "https://backend-notepad.vercel.app/notepad/v1/api/auth/check-otp",
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
        localStorage.setItem("token", token);
        localStorage.setItem("userName", userData?.name);
        localStorage.setItem("gender", userData?.gender);
        localStorage.setItem("loginId", userData?.id);
        onChange("isUserLoggedIn", true);
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
