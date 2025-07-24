"use client";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: "student" | "school" | "supporter";
}

export default function ProtectedRoute({
  children,
  requiredUserType,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Redirect to home page if not logged in
        router.push("/");
        return;
      }

      if (requiredUserType && user.type !== requiredUserType) {
        // Redirect to correct dashboard if wrong user type
        const correctRoute = getDashboardRoute(user.type);
        router.push(correctRoute);
        return;
      }
    }
  }, [user, isLoading, requiredUserType, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Loading...</h2>
          <p className="text-gray-600">Verifying authentication</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  if (requiredUserType && user.type !== requiredUserType) {
    return null; // Will redirect via useEffect
  }

  return <>{children}</>;
}

function getDashboardRoute(userType: string): string {
  switch (userType) {
    case "student":
      return "/student/dashboard";
    case "school":
      return "/school/dashboard";
    case "supporter":
      return "/supporter/dashboard";
    default:
      return "/dashboard";
  }
}
