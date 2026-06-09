"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const IDLE_LIMIT_MS = 60 * 60 * 1000;

const ACTIVITY_EVENTS = [
  "click",
  "mousemove",
  "mousedown",
  "keydown",
  "scroll",
  "touchstart",
];

export default function AdminIdleLogout() {
  const router = useRouter();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let isMounted = true;
    let isAdmin = false;

    const clearIdleTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const handleLogout = async () => {
      clearIdleTimer();

      await supabase.auth.signOut();

      router.push("/login");
      router.refresh();
    };

    const resetIdleTimer = () => {
      if (!isAdmin) return;

      clearIdleTimer();

      timeoutRef.current = setTimeout(() => {
        void handleLogout();
      }, IDLE_LIMIT_MS);
    };

    const setupIdleLogout = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!isMounted || !user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (!isMounted) return;

      if (profile?.role !== "admin") return;

      isAdmin = true;

      ACTIVITY_EVENTS.forEach((eventName) => {
        window.addEventListener(eventName, resetIdleTimer);
      });

      resetIdleTimer();
    };

    void setupIdleLogout();

    return () => {
      isMounted = false;
      clearIdleTimer();

      ACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, resetIdleTimer);
      });
    };
  }, [router]);

  return null;
}
