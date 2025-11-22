/**
 * POST /api/n8n/validate
 *
 * Simple endpoint to validate n8n webhook credentials
 * Returns success if API key is valid
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '../_utils/validate';

export async function POST(request: NextRequest) {
  // Validate authentication
  const validation = validateRequest(request);

  if (!validation.valid) {
    return NextResponse.json(
      {
        success: false,
        error: validation.error
      },
      { status: 401 }
    );
  }

  // If we get here, the API key is valid
  return NextResponse.json(
    {
      success: true,
      message: 'Authentication successful',
      timestamp: new Date().toISOString()
    },
    { status: 200 }
  );
}
