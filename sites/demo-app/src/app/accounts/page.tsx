import { Suspense } from "react";
import { Spinner } from "@myrepo/ui-components";
import AccountsContent from "./AccountsContent";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function AccountsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Suspense fallback={<Spinner size="lg" text="Loading accounts..." />}>
        <AccountsContent />
      </Suspense>
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          This page uses <code className="bg-muted px-1 py-0.5 rounded">TanStack Query</code> for 
          caching and state management.
        </p>
      </div>
    </div>
  );
}