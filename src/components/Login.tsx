import { useTheme } from "@mui/material";
import { AuthProvider, SignInPage } from "@toolpad/core";
import axios from "axios";
import { REACT_APP_API_ORIGIN } from "../Config";

const providers = [{ id: 'credentials', name: 'Email and Password' }];


const signIn: (provider: AuthProvider, formData: FormData) => void = async (
  provider,
  formData,
) => {
  const promise = new Promise<void>((resolve) => {
    const email = formData?.get('email');
    const password = formData?.get('password');
    const response = axios.post(REACT_APP_API_ORIGIN+"/login", {username: email, password: password});
    console.log(response);

    resolve();
  });
  return promise;
};

export default function CredentialsSignInPage() {
  const theme = useTheme();
  return (
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false } }}
      />
  );
}