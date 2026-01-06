import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Dynamic imports to ensure env vars are loaded first
async function seed() {
    const { STRATEGY_TICKERS } = await import('@/lib/tickers');
    const { ROBOTICS_TICKERS } = await import('@/lib/robotics-tickers');
    const { getStockData } = await import('@/lib/market-data');

    // Combine and deduplicate
    const ALL_TICKERS = Array.from(new Set([...STRATEGY_TICKERS, ...ROBOTICS_TICKERS]));
    const RANGES = ['YTD', '1Y', '2Y', '3Y'] as const;

    console.log(`🚀 Starting market data seed for ${ALL_TICKERS.length} tickers...`);
    console.log(`   Ranges: ${RANGES.join(', ')}`);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < ALL_TICKERS.length; i++) {
        const symbol = ALL_TICKERS[i];
        console.log(`\n[${i + 1}/${ALL_TICKERS.length}] Processing ${symbol}...`);

        for (const range of RANGES) {
            try {
                process.stdout.write(`   - Fetching ${range}... `);
                const data = await getStockData(symbol, range);
                if (data) {
                    process.stdout.write('OK\n');
                } else {
                    process.stdout.write('FAILED (No data)\n');
                }
            } catch (error: any) {
                process.stdout.write(`ERROR: ${error.message}\n`);
            }

            // Small delay between ranges to be nice
            await new Promise(r => setTimeout(r, 500));
        }

        successCount++;

        // Larger delay between tickers to avoid rate limits
        await new Promise(r => setTimeout(r, 2000));
    }

    console.log(`\n✅ Seeding complete!`);
}

seed().catch(console.error);
