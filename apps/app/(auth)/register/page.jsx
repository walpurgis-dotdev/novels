import { UserAuthForm } from "@/components/forms/user-auth-form";
import { AuthFormContent } from "@/components/wrappers/auth/auth-form-content";
import { fullURL } from "@/data/meta/builder";

export const metadata = {
  metadataBase: fullURL(),
  title: "Sign Up",
  description: "Sign up for an account",
};

export default function Page() {
  return (
    <AuthFormContent type="register" imageUrl="/assets/auth/sign-up.jpg">
      <UserAuthForm type="register" />
    </AuthFormContent>
  );
}
