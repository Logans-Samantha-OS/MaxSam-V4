/**
 * POST /api/n8n/messages
 *
 * Receives messages from n8n workflows (e.g., SMS responses, emails)
 * Stores message in conversations/messages tables
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateRequest, validateBody } from '../_utils/validate';
import { createClient } from '@supabase/supabase-js';

interface MessageData {
  conversation_id?: string;
  property_id?: string;
  phone_number?: string;
  email?: string;
  content: string;
  direction: 'inbound' | 'outbound';
  channel: 'sms' | 'email' | 'voice';
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
  let body: MessageData;
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
  if (!body.content || !body.direction || !body.channel) {
    return NextResponse.json(
      {
        success: false,
        error: 'Missing required fields: content, direction, channel'
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

    // If conversation_id is not provided, we need to find or create one
    let conversationId = body.conversation_id;

    if (!conversationId && body.property_id) {
      // Try to find existing conversation for this property
      // For now, we'll create a system conversation
      // TODO: Implement proper conversation lookup/creation logic based on your business rules
      const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .insert({
          title: `Message from ${body.phone_number || body.email || 'Unknown'}`,
          agent: 'sam', // Default agent
          metadata: {
            property_id: body.property_id,
            channel: body.channel,
            auto_created: true
          }
        })
        .select()
        .single();

      if (convError) {
        console.error('Failed to create conversation:', convError);
        return NextResponse.json(
          { success: false, error: 'Failed to create conversation' },
          { status: 500 }
        );
      }

      conversationId = conversation.id;
    }

    if (!conversationId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Either conversation_id or property_id must be provided'
        },
        { status: 400 }
      );
    }

    // Insert message
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        role: body.direction === 'inbound' ? 'user' : 'assistant',
        content: body.content,
        metadata: {
          ...body.metadata,
          channel: body.channel,
          phone_number: body.phone_number,
          email: body.email
        }
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to store message' },
        { status: 500 }
      );
    }

    // Update conversation timestamp
    await supabase
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId);

    return NextResponse.json(
      {
        success: true,
        message: 'Message stored successfully',
        data: {
          id: data.id,
          conversation_id: conversationId
        }
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
