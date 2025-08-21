import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    { id: "1", name: "Checking", balance: 1000 },
    { id: "2", name: "Savings", balance: 5000 },
  ]);
}