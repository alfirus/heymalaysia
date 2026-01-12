import dotenv from 'dotenv';
import path from 'path';

// 1. Load Environment Variables FIRST
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function run() {
  console.log("Starting Harvest Test...");
  
  // 2. Dynamic Import to ensure Env is loaded before db.ts is imported
  const { executeHarvestStep } = await import('../src/services/harvest-service');
  
  try {
    const result = await executeHarvestStep();
    console.log("Harvest Result:", JSON.stringify(result, null, 2));
  } catch (e) {
    console.error("Harvest Failed:", e);
  }
}

run();
