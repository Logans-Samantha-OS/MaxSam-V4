/**
 * Business Logic Services
 * 
 * This module exports service functions that handle business logic,
 * database operations, and external API integrations.
 * 
 * Services are pure functions that can be tested independently
 * and reused across routes, agents, and pipelines.
 * 
 * Example services:
 * - Property scoring service
 * - Skiptracing service
 * - Contact enrichment service
 * - Notification service
 * - Payment processing service
 */

export * from './database';
export * from './ai';
export * from './sms';
export * from './payments';
