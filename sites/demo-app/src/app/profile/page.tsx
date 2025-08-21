"use client";

import { use, Suspense } from "react";
import { getProfile } from "@/api/profile";
import { Card, CardContent, CardHeader, CardTitle, Spinner } from "@myrepo/ui-components";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function ProfileContent() {
  const profile = use(getProfile());

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p className="text-muted-foreground">{profile.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

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