"use client";
import { useEffect } from "react";

import { useRouter } from "@/src/hooks/useRouter";

import { Routes } from "@/src/config/routes";

// Redirect
export default function MyPolicies() {
  const router = useRouter();

  useEffect(() => {
    router.replace(Routes.MyActivePolicies);
  }, [router]);

  return null;
}
