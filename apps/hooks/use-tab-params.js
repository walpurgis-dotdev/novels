"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useTabParams = (tabs) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = React.useCallback((name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);
    return params.toString();
  }, []);

  const handleTabChange = React.useCallback(
    (tabValue, id) => {
      let query;
      if (tabValue === tabs[0].value) {
        query = createQueryString("label", "default");
      } else {
        // biome-ignore lint/style/useTemplate: <explanation>
        query = createQueryString("label", tabValue) + "&" + createQueryString("rankType", id.toString());
      }
      // biome-ignore lint/style/useTemplate: <explanation>
      router.push(pathname + "?" + query);
    },
    [tabs, createQueryString, router, pathname],
  );

  React.useEffect(() => {
    const label = searchParams.get("label");
    const defaultTabValue = tabs[0].value;

    if (!label || !tabs.find((tab) => tab.value === label)) {
      handleTabChange(defaultTabValue, 0);
    } else if (label === "default") {
      handleTabChange(defaultTabValue, 0);
    }
  }, [handleTabChange, searchParams, tabs]);

  const isActive = React.useCallback(
    (tabValue) => {
      const label = searchParams.get("label");
      return label === "default" ? tabs[0].value === tabValue : label === tabValue;
    },
    [searchParams, tabs],
  );

  return {
    isActive,
    handleTabChange,
    searchParams,
  };
};
