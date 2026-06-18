import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { CONSTANTS } from "~/shared/constants";
import { useToken } from "~/shared/hooks/useToken";

export const Route = createFileRoute("/")({
  component: Index,
});

// eslint-disable-next-line react-refresh/only-export-components
function Index() {
  const navigate = useNavigate();
  const { accessToken } = useToken();
  useEffect(() => {
    navigate({
      to: !accessToken ? CONSTANTS.URL.LOGIN : CONSTANTS.URL.DASHBOARD,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);
  return null;
}
