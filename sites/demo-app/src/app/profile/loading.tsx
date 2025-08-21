import { Spinner } from "@myrepo/ui-components";

export default function Loading() {
  return (
    <div className="max-w-md mx-auto">
      <Spinner size="lg" text="Loading profile..." />
    </div>
  );
}