import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { CONSTANTS } from "~/shared/constants";
import { useToken } from "~/shared/hooks";

export function VerifyAuth() {
  const navigate = useNavigate();
  const { accessToken } = useToken();

  useEffect(() => {
    if (!accessToken) {
      navigate({ to: CONSTANTS.URL.LOGIN });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);
  return null;
}
