/**
 * Shared validation helper for n8n webhooks
 * Validates API key and request structure
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates the n8n webhook request
 * Checks for valid API key in Authorization header
 *
 * @param request - The incoming request object
 * @returns ValidationResult with valid status and optional error message
 */
export function validateRequest(request: Request): ValidationResult {
  // Get API key from Authorization header
  const authHeader = request.headers.get('authorization');

  if (!authHeader) {
    return {
      valid: false,
      error: 'Missing Authorization header'
    };
  }

  // Expected format: "Bearer <api_key>"
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return {
      valid: false,
      error: 'Invalid Authorization format. Expected: Bearer <token>'
    };
  }

  // Validate against environment variable
  // TODO: User should set N8N_API_KEY in Vercel environment variables
  const validApiKey = process.env.N8N_API_KEY;

  if (!validApiKey) {
    console.error('N8N_API_KEY environment variable is not set');
    return {
      valid: false,
      error: 'Server configuration error'
    };
  }

  if (token !== validApiKey) {
    return {
      valid: false,
      error: 'Invalid API key'
    };
  }

  return { valid: true };
}

/**
 * Validates JSON body exists
 *
 * @param body - The parsed JSON body
 * @returns ValidationResult
 */
export function validateBody(body: any): ValidationResult {
  if (!body || typeof body !== 'object') {
    return {
      valid: false,
      error: 'Request body must be valid JSON object'
    };
  }

  return { valid: true };
}
