import { Suspense } from "react";
import { Spinner } from "@myrepo/ui-components";
import ProfileContent from "./ProfileContent";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function ProfilePage() {
  return (
    <div className="max-w-md mx-auto">
      <Suspense fallback={<Spinner size="lg" text="Loading profile..." />}>
        <ProfileContent />
      </Suspense>
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          This page uses React 19's <code className="bg-muted px-1 py-0.5 rounded">use()</code> hook 
          with Suspense for data fetching.
        </p>
      </div>
    </div>
  );
}