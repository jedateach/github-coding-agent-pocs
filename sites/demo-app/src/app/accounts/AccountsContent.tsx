"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAccounts } from "@/api/accounts";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@myrepo/ui-components";

export default function AccountsContent() {
  const queryClient = useQueryClient();
  const { data: accounts, isLoading, error } = useQuery({
    queryKey: ["accounts"],
    queryFn: getAccounts,
  });

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <p className="text-center">Loading accounts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <p className="text-center text-destructive">
          Error: {error instanceof Error ? error.message : 'An error occurred'}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Account Dashboard</h1>
        <Button 
          onClick={() => queryClient.invalidateQueries({ queryKey: ["accounts"] })}
        >
          Refresh Accounts
        </Button>
      </div>
      
      <div className="space-y-4">
        {accounts?.map((account) => (
          <Card key={account.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {account.name}
                <span className="text-lg font-mono">
                  ${account.balance.toLocaleString()}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Account ID: {account.id}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}