import { Spinner } from "@myrepo/ui-components";

export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto">
      <Spinner size="lg" text="Loading accounts..." />
    </div>
  );
}