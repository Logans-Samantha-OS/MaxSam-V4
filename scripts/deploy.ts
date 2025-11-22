/**
 * Deployment Script
 * 
 * Handles deployment to Vercel and Supabase
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface DeploymentConfig {
  environment: 'development' | 'staging' | 'production';
  vercel: boolean;
  supabase: boolean;
  runMigrations: boolean;
}

async function deploy(config: DeploymentConfig) {
  console.log(`🚀 Starting deployment to ${config.environment}...`);

  try {
    // Deploy to Vercel
    if (config.vercel) {
      console.log('📦 Deploying to Vercel...');
      const vercelCommand = config.environment === 'production' 
        ? 'vercel --prod' 
        : 'vercel';
      execSync(vercelCommand, { stdio: 'inherit' });
      console.log('✅ Vercel deployment complete');
    }

    // Run Supabase migrations
    if (config.supabase && config.runMigrations) {
      console.log('🗄️  Running Supabase migrations...');
      execSync('supabase db push', { stdio: 'inherit' });
      console.log('✅ Migrations complete');
    }

    console.log(`✅ Deployment to ${config.environment} complete!`);
  } catch (error) {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const environment = (args[0] as any) || 'development';

const config: DeploymentConfig = {
  environment,
  vercel: !args.includes('--skip-vercel'),
  supabase: !args.includes('--skip-supabase'),
  runMigrations: args.includes('--migrations'),
};

deploy(config);
