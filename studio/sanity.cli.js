import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "luona25o",
    dataset: process.env.SANITY_STUDIO_DATASET || "production"
  }
});
