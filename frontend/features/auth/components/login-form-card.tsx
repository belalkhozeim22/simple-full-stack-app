import { Card } from "@/components/ui/card";
import { LoginForm } from "./login-form";

export function LoginFormCard() {
  return (
    <Card className="w-full max-w-sm">
      <LoginForm />
    </Card>
  );
}
