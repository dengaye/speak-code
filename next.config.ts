import type { NextConfig } from "next";
import fs from 'fs';
import path from 'path';
import * as devConfigModule from './dev.config.js';

type DevSettings = {
  disableTelemetry: boolean;
  optimizeForSpeed: boolean;
  memoryLimit: number;
};

let devSettings: DevSettings = {
  disableTelemetry: false,
  optimizeForSpeed: false,
  memoryLimit: 0,
};

try {
  if (process.env.NODE_ENV === 'development') {
    const devConfigPath = path.join(process.cwd(), 'dev.config.js');
    if (fs.existsSync(devConfigPath)) {
      devSettings = { ...devSettings, ...(devConfigModule as any).devSettings };
      console.log('✅ Loaded development config with optimizations');
    }
  }
} catch (e) {
  console.warn('❌ Failed to load development config:', e);
}

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Disable telemetry if configured in development settings
  ...(isDev && devSettings.disableTelemetry ? { telemetry: { telemetryDisabled: true } } : {}),
  
  // Apply optimization settings from development config
  ...(isDev && devSettings.optimizeForSpeed ? { swcMinify: true } : {}),
  
  // Increase browser poll interval     
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: isDev && devSettings.memoryLimit > 0 ? devSettings.memoryLimit : 60 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5,
  },
};

export default nextConfig;
