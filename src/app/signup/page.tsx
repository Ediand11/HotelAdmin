import { SignUp } from "@/components/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Up",
};

export default function SignUpPage() {
  return (
    <main>
      <SignUp />
    </main>
  );
}
