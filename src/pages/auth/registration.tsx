import AuthLayout from "@/layout/AuthLayout";
import RegistrationForm from "@components/Registraion";


const RegistrationPage : React.FC = ()=> {
        return (
            <AuthLayout>
                <RegistrationForm />
            </AuthLayout>
 
          );
}

export default RegistrationPage