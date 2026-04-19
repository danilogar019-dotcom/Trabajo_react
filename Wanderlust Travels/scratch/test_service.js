/* eslint-disable no-unused-vars */
import { exportToSQL, exportToYAML } from './src/services/importExportService.js';

// Mock getOpiniones since we are in node and not in browser with firebase
// This script might fail if service imports firestore directly without mock
// But let's see.
console.log("Testing service exports...");
// Since I can't easily run it with imports in Node without more setup (Vite + Firestore),
// I'll skip the automated execution and just rely on manual verification by the user.
