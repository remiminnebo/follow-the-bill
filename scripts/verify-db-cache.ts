import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

async function verify() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    console.log("--- Database Cache Verification ---");
    const count = await prisma.marketCache.count();
    console.log(`Total records in MarketCache: ${count}`);

    const sample = await prisma.marketCache.findFirst();
    if (sample) {
      console.log("\nSample Record:");
      console.log(`Symbol: ${sample.symbol}`);
      console.log(`Range: ${sample.range}`);
      console.log(`Updated At: ${sample.updatedAt}`);
      
      const data = sample.data as any;
      console.log(`Data Symbol: ${data.symbol}`);
      console.log(`Current Price: ${data.currentPrice}`);
      console.log(`History Points: ${data.history?.length || 0}`);
    }

    const summary = await prisma.marketCache.groupBy({
      by: ['range'],
      _count: {
        symbol: true
      }
    });
    console.log("\nRecords by range:");
    console.table(summary);

  } catch (e: any) {
    console.error(`❌ Error verifying DB: ${e.message}`);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

verify();
