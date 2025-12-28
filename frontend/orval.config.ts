import { defineConfig } from "orval";

export default defineConfig({
  // You now only need one unified configuration block
  strapiClient: {
    output: {
      mode: "tags-split",
      // Change this to a single directory for all generated endpoints
      target: "strapi-endpoints/__generated__/strapi-client",
      client: "axios",
      override: {
        mutator: {
          // Point to the file where you put the unified 'strapiClient'
          path: "strapi-endpoints/lib/strapi-client.ts",
          // IMPORTANT: This must match the exported function name
          name: "strapiClient",
        },
      },
    },
    input: {
      target: "strapi-endpoints/specification.json",
    },
    hooks: {
      afterAllFilesWrite: "pnpx prettier --write",
    },
  },
  // 2. New Zod Schema Generator
  strapiZod: {
    output: {
      mode: "tags-split",
      // Output to a dedicated 'zod' folder to avoid clutter
      target: "strapi-endpoints/__generated__/strapi-zod",
      client: "zod",
      schemas: "strapi-endpoints/__generated__/strapi-zod/__interfaces__",
      // Helpful to distinguish these files
      fileExtension: ".zod.ts",
    },
    input: {
      target: "strapi-endpoints/specification.json",
    },
    hooks: {
      afterAllFilesWrite: "pnpx prettier --write",
    },
  },
});
