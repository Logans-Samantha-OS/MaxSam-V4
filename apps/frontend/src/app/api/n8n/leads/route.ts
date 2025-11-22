/**
 * POST /api/n8n/leads
 *
 * Receives lead data from n8n workflows
 * Validates and stores lead information in Supabase
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateRequest, validateBody } from '../_utils/validate';
import { createClient } from '@supabase/supabase-js';

interface LeadData {
  address: string;
  city: string;
  state: string;
  zip: string;
  owner_name?: string;
  owner_phone?: string;
  owner_email?: string;
  assessed_value?: number;
  market_value?: number;
  metadata?: Record<string, any>;
}

export async function POST(request: NextRequest) {
  // Validate authentication
  const authValidation = validateRequest(request);
  if (!authValidation.valid) {
    return NextResponse.json(
      { success: false, error: authValidation.error },
      { status: 401 }
    );
  }

  // Parse and validate body
  let body: LeadData;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  const bodyValidation = validateBody(body);
  if (!bodyValidation.valid) {
    return NextResponse.json(
      { success: false, error: bodyValidation.error },
      { status: 400 }
    );
  }

  // Validate required fields
  if (!body.address || !body.city || !body.state || !body.zip) {
    return NextResponse.json(
      {
        success: false,
        error: 'Missing required fields: address, city, state, zip'
      },
      { status: 400 }
    );
  }

  // TODO: User should set these in Vercel environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase environment variables not configured');
    return NextResponse.json(
      { success: false, error: 'Server configuration error' },
      { status: 500 }
    );
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert lead into properties table
    const { data, error } = await supabase
      .from('properties')
      .insert({
        address: body.address,
        city: body.city,
        state: body.state,
        zip: body.zip,
        owner_name: body.owner_name,
        owner_phone: body.owner_phone,
        owner_email: body.owner_email,
        assessed_value: body.assessed_value,
        market_value: body.market_value,
        status: 'active',
        metadata: body.metadata || {}
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to store lead' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Lead created successfully',
        data: { id: data.id }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
