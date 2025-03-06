import type { NextConfig } from "next";
import fs from 'fs';
import path from 'path';

let devSettings = {
  disableTelemetry: false,
  optimizeForSpeed: false,
  memoryLimit: 0,
};

try {
  if (process.env.NODE_ENV === 'development') {
    const devConfigPath = path.join(process.cwd(), 'dev.config.js');
    if (fs.existsSync(devConfigPath)) {
      const devConfig = require('./dev.config.js');
      devSettings = { ...devSettings, ...devConfig.devSettings };
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
  
  // Increase browser poll interval     
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 60 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5,
  },
};

export default nextConfig;
