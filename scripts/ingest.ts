/**
 * Data Ingestion Script
 * 
 * Ingests property and excess funds data into Supabase
 */

import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';

interface IngestOptions {
  source: 'properties' | 'excess-funds' | 'all';
  dryRun: boolean;
  batchSize: number;
}

async function ingest(options: IngestOptions) {
  console.log('📥 Starting data ingestion...');

  // Initialize Supabase client
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase credentials');
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    if (options.source === 'properties' || options.source === 'all') {
      console.log('📊 Ingesting property records...');
      const propertiesPath = path.join(__dirname, '../tests/sample_property_records.json');
      const properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));

      if (options.dryRun) {
        console.log(`Would insert ${properties.length} properties`);
      } else {
        const { data, error } = await supabase
          .from('properties')
          .insert(properties);

        if (error) throw error;
        console.log(`✅ Inserted ${properties.length} properties`);
      }
    }

    if (options.source === 'excess-funds' || options.source === 'all') {
      console.log('💰 Ingesting excess funds data...');
      const excessFundsPath = path.join(__dirname, '../tests/sample_excess_funds.json');
      const excessFunds = JSON.parse(fs.readFileSync(excessFundsPath, 'utf-8'));

      if (options.dryRun) {
        console.log(`Would insert ${excessFunds.length} excess funds records`);
      } else {
        // TODO: Create excess_funds table and insert
        console.log(`⚠️  Excess funds table not yet created`);
      }
    }

    console.log('✅ Data ingestion complete!');
  } catch (error) {
    console.error('❌ Ingestion failed:', error);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const source = (args[0] as any) || 'all';
const dryRun = args.includes('--dry-run');
const batchSize = parseInt(args.find(arg => arg.startsWith('--batch='))?.split('=')[1] || '100');

const options: IngestOptions = {
  source,
  dryRun,
  batchSize,
};

ingest(options);
