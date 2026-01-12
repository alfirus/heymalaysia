import { NextResponse } from 'next/server';
import { executeHarvestStep } from '@/services/harvest-service';

export const dynamic = 'force-dynamic'; // Prevent caching
export const maxDuration = 60; // Extend timeout for serverless functions if possible

export async function GET() {
  try {
    const result = await executeHarvestStep();
    return NextResponse.json({
        success: true,
        ...result
    });
  } catch (error: any) {
    console.error("Harvesting Error:", error);
    return NextResponse.json({
        success: false,
        error: error.message || "Internal Server Error"
    }, { status: 500 });
  }
}
