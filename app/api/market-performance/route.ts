import { NextRequest, NextResponse } from 'next/server';
import { getAggregatePerformance } from '@/lib/market-data';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const range = (searchParams.get('range') as 'YTD' | '1Y' | '2Y' | '3Y') || 'YTD';

  try {
    const performance = await getAggregatePerformance(range);
    
    if (!performance) {
      return NextResponse.json({ error: 'Failed to fetch performance data' }, { status: 500 });
    }

    return NextResponse.json(performance);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
