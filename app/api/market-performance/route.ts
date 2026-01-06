import { NextRequest, NextResponse } from 'next/server';
import { getAggregatePerformance } from '@/lib/market-data';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const range = (searchParams.get('range') as 'YTD' | '1Y' | '2Y' | '3Y') || 'YTD';
  const ecosystem = (searchParams.get('ecosystem') as 'ai' | 'robotics') || 'ai';

  console.log(`API Request for market performance: range=${range}, ecosystem=${ecosystem}`);

  try {
    const performance = await getAggregatePerformance(range, ecosystem);

    if (!performance || performance.tickers.length === 0) {
      console.warn(`No performance data found for range=${range}`);
      // Don't return 500 if we just didn't find data, return empty state
    }

    return NextResponse.json(performance, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error: any) {
    console.error('API Route Error:', error.message);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
