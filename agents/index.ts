/**
 * Agents Module
 * 
 * Exports all AI agent definitions and the router for orchestration.
 */

export { default as sam, samConfig, processSamMessage, getSamMemory } from './sam';
export { default as eleanor, eleanorConfig, processEleanorQuery, generateReport } from './eleanor';
export { default as alex, alexConfig, generateCreativeContent, generateBrandingMaterials } from './alex';
export { default as nanobanana, nanoBananaConfig, generateN8nWorkflow, transformJSON, executeTechnicalTask } from './nanobanana';
export { default as router, routeToAgent, coordinateAgents } from './router';

export type { AgentType, AgentRequest, AgentResponse } from './router';
export type { SamConfig } from './sam';
export type { EleanorConfig } from './eleanor';
export type { AlexConfig } from './alex';
export type { NanoBananaConfig } from './nanobanana';
