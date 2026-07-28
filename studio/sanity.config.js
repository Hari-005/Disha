import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes/index.js";

export default defineConfig({
  name: "disha",
  title: "Disha Student Assist Cell",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "luona25o",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes
  }
});
