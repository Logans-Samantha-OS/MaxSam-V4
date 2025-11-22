/**
 * POST /api/n8n/events
 *
 * Receives event data from n8n workflows
 * Logs events for tracking campaigns, pipeline jobs, and system activities
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateRequest, validateBody } from '../_utils/validate';
import { createClient } from '@supabase/supabase-js';

interface EventData {
  event_type: string;
  entity_type?: 'property' | 'campaign' | 'conversation' | 'pipeline_job';
  entity_id?: string;
  status?: string;
  data?: Record<string, any>;
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
  let body: EventData;
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
  if (!body.event_type) {
    return NextResponse.json(
      {
        success: false,
        error: 'Missing required field: event_type'
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

    // Handle different event types
    switch (body.event_type) {
      case 'campaign_update':
        if (body.entity_type === 'campaign' && body.entity_id) {
          await handleCampaignUpdate(supabase, body);
        }
        break;

      case 'pipeline_status':
        if (body.entity_type === 'pipeline_job' && body.entity_id) {
          await handlePipelineStatus(supabase, body);
        }
        break;

      case 'property_update':
        if (body.entity_type === 'property' && body.entity_id) {
          await handlePropertyUpdate(supabase, body);
        }
        break;

      default:
        // Log as generic event
        console.log('Event received:', {
          type: body.event_type,
          entity: body.entity_type,
          id: body.entity_id
        });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Event processed successfully',
        event_type: body.event_type
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Helper function to handle campaign status updates
 */
async function handleCampaignUpdate(supabase: any, body: EventData) {
  if (!body.entity_id) return;

  const updateData: any = {
    updated_at: new Date().toISOString()
  };

  if (body.status) {
    updateData.status = body.status;
  }

  if (body.status === 'completed') {
    updateData.completed_at = new Date().toISOString();
  }

  await supabase
    .from('campaigns')
    .update(updateData)
    .eq('id', body.entity_id);
}

/**
 * Helper function to handle pipeline job status updates
 */
async function handlePipelineStatus(supabase: any, body: EventData) {
  if (!body.entity_id) return;

  const updateData: any = {
    updated_at: new Date().toISOString()
  };

  if (body.status) {
    updateData.status = body.status;
  }

  if (body.data) {
    updateData.result = body.data;
  }

  if (body.status === 'completed') {
    updateData.completed_at = new Date().toISOString();
  }

  if (body.status === 'failed') {
    updateData.failed_at = new Date().toISOString();
    if (body.data?.error) {
      updateData.error = body.data.error;
    }
  }

  await supabase
    .from('pipeline_jobs')
    .update(updateData)
    .eq('id', body.entity_id);
}

/**
 * Helper function to handle property updates
 */
async function handlePropertyUpdate(supabase: any, body: EventData) {
  if (!body.entity_id) return;

  const updateData: any = {
    updated_at: new Date().toISOString()
  };

  if (body.status) {
    updateData.status = body.status;
  }

  if (body.data) {
    // Merge new data into metadata
    const { data: property } = await supabase
      .from('properties')
      .select('metadata')
      .eq('id', body.entity_id)
      .single();

    if (property) {
      updateData.metadata = {
        ...property.metadata,
        ...body.data
      };
    }
  }

  await supabase
    .from('properties')
    .update(updateData)
    .eq('id', body.entity_id);
}
