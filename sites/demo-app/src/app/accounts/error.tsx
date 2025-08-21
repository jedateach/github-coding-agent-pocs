"use client";

import { ErrorBox } from "@myrepo/ui-components";

export default function Error({ 
  error, 
  reset 
}: { 
  error: Error & { digest?: string }; 
  reset: () => void;
}) {
  return (
    <div className="max-w-md mx-auto">
      <ErrorBox 
        title="Failed to load accounts"
        message={error.message || "An unexpected error occurred"} 
      />
      <div className="mt-4 text-center">
        <button
          onClick={reset}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}