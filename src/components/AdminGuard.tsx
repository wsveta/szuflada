"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getProfile } from "@/lib/profile";
import type { Profile } from "@/types/profile";

type AdminGuardProps = {
  children: React.ReactNode;
};

export default function AdminGuard({ children }: AdminGuardProps) {
  const { user, isLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isCheckingProfile, setIsCheckingProfile] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setIsCheckingProfile(false);
        return;
      }

      const data = await getProfile(user.id);
      setProfile(data);
      setIsCheckingProfile(false);
    };

    loadProfile();
  }, [user]);

  if (isLoading || isCheckingProfile) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <p className="text-gray-500 dark:text-zinc-400">...</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <p className="text-gray-500 dark:text-zinc-400">
          You need to log in to access this page.
        </p>

        <Link
          href="/login"
          className="mt-6 inline-flex rounded-full bg-black text-white dark:bg-white dark:text-black px-6 py-3"
        >
          Login
        </Link>
      </section>
    );
  }

  if (profile?.role !== "admin") {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <p className="text-gray-500 dark:text-zinc-400">
          You do not have access to this page.
        </p>
      </section>
    );
  }

  return <>{children}</>;
}