import { UserAuthForm } from "@/components/forms/user-auth-form";
import { AuthFormContent } from "@/components/wrappers/auth/auth-form-content";
import { fullURL } from "@/data/meta/builder";

export const metadata = {
  metadataBase: fullURL(),
  title: "Sign In",
  description: "Sign into your account",
};

export default function Page() {
  return (
    <AuthFormContent imageUrl="/assets/auth/sign-in.jpg">
      <UserAuthForm />
    </AuthFormContent>
  );
}
