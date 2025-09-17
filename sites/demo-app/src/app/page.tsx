import { Card, CardContent, CardHeader, CardTitle } from "@myrepo/ui-components";

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to the Data Fetching POC</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            This proof of concept demonstrates data fetching patterns using:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li><strong>Profile Page:</strong> React 19's use() hook with Suspense</li>
            <li><strong>Accounts Page:</strong> TanStack Query for caching and state management</li>
            <li><strong>Error Handling:</strong> App Router error.tsx conventions</li>
            <li><strong>Loading States:</strong> App Router loading.tsx conventions</li>
            <li><strong>Mocking:</strong> MSW for API mocking</li>
            <li><strong>UI Components:</strong> ShadCN components with Tailwind CSS</li>
          </ul>
          <p className="text-muted-foreground mt-4">
            Use the navigation above to explore different data fetching approaches.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}