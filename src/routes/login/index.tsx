import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { CONSTANTS } from "~/shared/constants";
import { usePageDetails, useToken } from "~/shared/hooks";
// import { useEffect } from "react";
import { managerClassNames } from "~/shared/utils";
// import { useNavigate } from "react-router";
// import { CONSTANTS } from "~/shared/constants";
// import { useToken } from "~/shared/hooks";
// import { usePageDetails } from "~/shared/hooks/usePageDetails";
// import { managerClassNames } from "~/shared/utils";
import { LoginForm } from "./components/Form";

export const Route = createFileRoute("/login/")({
  component: LoginPage,
});

// eslint-disable-next-line react-refresh/only-export-components
function LoginPage() {
  const navigate = useNavigate();
  const { accessToken } = useToken();

  usePageDetails({ title: "Login" });

  useEffect(() => {
    if (accessToken) {
      navigate({ to: CONSTANTS.URL.DASHBOARD });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  if (accessToken) return null;

  return (
    <div className="flex items-center justify-center h-full bg-surface-brand-02-primary">
      <div
        className={managerClassNames([
          "flex items-center justify-center flex-col gap-6 border border-stroke-primary rounded-xl p-16 w-96",
          "shadow-lg shadow-black/25 bg-surface-primary",
        ])}
      >
        <h1 className="font-extrabold text-center text-5xl text-black">
          Crepoc
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
