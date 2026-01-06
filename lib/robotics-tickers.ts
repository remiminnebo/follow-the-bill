// Robotics Strategy Categories - Humanoid Robotics Ecosystem
// Educational framework tracking the robotics supply chain
// Global coverage: US, Japan, China, and Europe
// NOTE: This is not an actual ETF - purely an educational investment thesis

export const ROBOTICS_CATEGORIES = {
    // Unique to Robotics Ecosystem - Global Robotics Leaders
    "Humanoid & Industrial Robotics": [
        // Japan
        '6954.T',   // Fanuc (Japan) - World's largest industrial robot maker
        '6506.T',   // Yaskawa Electric (Japan) - Motion control & robotics leader
        // US
        'ISRG',     // Intuitive Surgical - Surgical robotics pioneer (da Vinci)
        'TER',      // Teradyne - Owns Universal Robots (cobots)
        'IRBT',     // iRobot - Consumer robotics
        // Global
        'ABB',      // ABB Ltd (Switzerland) - Global industrial automation
        // China ADRs & related
        'BIDU',     // Baidu - Apollo autonomous driving, robotaxi
        'XPEV',     // XPeng - EV & humanoid robot development
    ],
    "Motion Control & Actuators": [
        // US
        'ROK',      // Rockwell Automation - Industrial automation
        'EMR',      // Emerson Electric - Process automation
        'PH',       // Parker Hannifin - Motion & control
        'ITW',      // Illinois Tool Works - Industrial equipment
        'GNRC',     // Generac - Power equipment
        // Japan
        '6501.T',   // Hitachi (Japan) - Electronics & automation
        // China
        'SIEGY',    // Siemens (Germany ADR) - Factory automation
    ],
    "Sensors & Vision": [
        // US
        'CGNX',     // Cognex - Machine vision systems
        'NOVT',     // Novanta - Precision motion & photonics
        'TDY',      // Teledyne Technologies - Digital imaging
        'MKSI',     // MKS Instruments - Process control
        // Japan
        '6861.T',   // Keyence (Japan) - Sensors & measurement systems
        // China-adjacent semiconductors
        'ON',       // ON Semiconductor - Image sensors
    ],
    "AI & Autonomy": [
        // AI companies powering robotics intelligence
        'NVDA',     // NVIDIA - AI chips, Omniverse for robotics sim
        'GOOGL',    // Google/Waymo - Autonomous driving
        'TSLA',     // Tesla - Optimus humanoid robot
        'AMZN',     // Amazon - Warehouse robotics (Kiva/Sparrow)
    ],
    // Shared with AI Ecosystem
    "Semiconductors": ['NVDA', 'TSM', 'AMD', 'AVGO', 'ASML', 'QCOM', 'MU', 'INTC', 'ARM'],
    // Shared with AI Ecosystem
    "Energy & Nuclear": ['VST', 'CEG', 'NRG', 'NEE', 'OKLO', 'SMR', 'BWXT', 'TLN'],
    // Shared with AI Ecosystem
    "Resources": ['CCJ', 'KAP.L', 'MP', 'FCX', 'UUUU', 'NXE', 'DNN', 'URA']
};

// Flattened tickers for API calls (deduplicated)
export const ROBOTICS_TICKERS = [...new Set(Object.values(ROBOTICS_CATEGORIES).flat())];

// Japan-specific tickers (Tokyo Stock Exchange)
export const JAPAN_TICKERS = ['6954.T', '6506.T', '6503.T', '6861.T', '6501.T'];

// China/HK related tickers (for labeling purposes)
export const CHINA_TICKERS = ['BIDU', 'XPEV'];

// Categories that are shared between AI and Robotics ecosystems
export const SHARED_CATEGORIES = ['Semiconductors', 'Energy & Nuclear', 'Resources'];

// Categories unique to Robotics Ecosystem
export const ROBOTICS_ONLY_CATEGORIES = ['Humanoid & Industrial Robotics', 'Motion Control & Actuators', 'Sensors & Vision', 'AI & Autonomy'];
