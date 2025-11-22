/**
 * Validation Utilities
 * 
 * Common validation functions for data integrity
 */

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  // US phone number validation
  const phoneRegex = /^\+?1?\d{10,11}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

export function isValidZip(zip: string): boolean {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zip);
}

export function isValidState(state: string): boolean {
  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];
  return states.includes(state.toUpperCase());
}

export function sanitizeString(str: string): string {
  return str.trim().replace(/[^\w\s\-]/g, '');
}

export function validateRequired(obj: Record<string, any>, fields: string[]): string[] {
  const missing: string[] = [];
  for (const field of fields) {
    if (!obj[field]) {
      missing.push(field);
    }
  }
  return missing;
}
