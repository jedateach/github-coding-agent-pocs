"use client";

import { use, useMemo } from "react";
import { getProfile } from "@/api/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@myrepo/ui-components";

export default function ProfileContent() {
  // Memoize the promise to prevent infinite calls
  const profilePromise = useMemo(() => getProfile(), []);
  const profile = use(profilePromise);

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