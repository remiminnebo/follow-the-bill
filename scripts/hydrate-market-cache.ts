// Use require to ensure order of execution
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
dotenv.config();

const { STRATEGY_TICKERS, getStockData } = require('../lib/market-data');
const { prisma } = require('../lib/db');

const RANGES = ['YTD', '1Y', '2Y', '3Y'];

async function hydrate() {
  console.log(`🚀 Starting hydration for ${STRATEGY_TICKERS.length} tickers and ${RANGES.length} ranges...`);
  
  let successCount = 0;
  let failCount = 0;

  for (const range of RANGES) {
    console.log(`\n--- Processing Range: ${range} ---`);
    for (const ticker of STRATEGY_TICKERS) {
      try {
        const data = await getStockData(ticker, range);
        if (data) {
          console.log(`✅ Hydrated ${ticker} [${range}]`);
          successCount++;
        } else {
          console.error(`❌ Failed to fetch ${ticker} [${range}]`);
          failCount++;
        }
        
        // Politeness delay - increased to be more conservative
        await new Promise(resolve => setTimeout(resolve, 5000));
      } catch (error: any) {
        console.error(`💥 Error with ${ticker} [${range}]: ${error.message}`);
        failCount++;
      }
    }
  }

  console.log(`\n✨ Hydration complete!`);
  console.log(`📊 Success: ${successCount}`);
  console.log(`⚠️  Failed: ${failCount}`);
}

hydrate()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });