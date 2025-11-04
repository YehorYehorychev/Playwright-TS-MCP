import { type FullConfig } from "@playwright/test";
import path from "path";
import fs from "fs";

export default async function globalSetup(config: FullConfig) {
  console.log(`[INFO]: Starting the global setup...`);
  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    console.log(`[INFO]: Detecting local runs.`);

    // Delete Allure Results
    const resultsDir = path.resolve(process.cwd(), "allure-results");
    console.log(`>> resultsDir: ${resultsDir}`);

    if (fs.existsSync(resultsDir)) {
      fs.rmSync(resultsDir, { recursive: true, force: true });
      console.log(`[INFO]: Allure results have been deleted for local runs.`);
    }
  }
  console.log(`[INFO]: Completed the global setup!`);
}
