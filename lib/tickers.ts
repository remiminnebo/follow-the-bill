// Tickers categorized by Supply Chain Level
export const STRATEGY_CATEGORIES = {
  "AI & Cloud": ['MSFT', 'GOOGL', 'AMZN', 'META', 'PLTR', 'SNOW', 'CRWD', 'MDB', 'DDOG', 'NET', 'TEAM', 'PATH'],
  "Semiconductors": ['NVDA', 'TSM', 'AMD', 'AVGO', 'ASML', 'QCOM', 'MU', 'AMAT', 'LRCX', 'ADI', 'TXN', 'INTC', 'ARM'],
  "Infrastructure": ['EQIX', 'DLR', 'VRT', 'SBGSY', 'STK', 'ETN'],
  "Energy & Nuclear": ['VST', 'CEG', 'NRG', 'NEE', 'OKLO', 'SMR', 'BWXT', 'TLN'],
  "Resources": ['CCJ', 'KAP.L', 'MP', 'FCX', 'UUUU', 'NXE', 'DNN', 'URA']
};

// Flattened tickers for API calls
export const STRATEGY_TICKERS = Object.values(STRATEGY_CATEGORIES).flat();
