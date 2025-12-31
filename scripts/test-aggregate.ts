import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { getAggregatePerformance } from '../lib/market-data';
import { prisma } from '../lib/db';

async function test() {
  try {
    console.log("Testing getAggregatePerformance('YTD')...");
    const result = await getAggregatePerformance('YTD');
    
    if (result) {
      console.log("✅ Success!");
      console.log(`Tickers found: ${result.tickers.length}`);
      console.log(`Current Value: ${result.currentValue}`);
      console.log(`Total Change: ${result.totalChange}%`);
      console.log(`History points: ${result.history.length}`);
      if (result.history.length > 0) {
        console.log("First history point:", result.history[0]);
        console.log("Last history point:", result.history[result.history.length - 1]);
      }
    } else {
      console.log("❌ Returned null");
    }
  } catch (e: any) {
    console.error("❌ Error:", e.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
