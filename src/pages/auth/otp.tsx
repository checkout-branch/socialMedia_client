import AuthLayout from "@/layout/AuthLayout"
import VerifyOTP from "@components/VerifyOtp"

const OTP:React.FC = () => {
    return(
        <AuthLayout>
            <VerifyOTP/>
        </AuthLayout>
    )

}

export default OTP