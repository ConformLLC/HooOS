import { defineApplication } from 'twenty-sdk/define';

export const APPLICATION_UNIVERSAL_IDENTIFIER =
  '78d4c86f-c00f-405b-8937-676b99a29a67';

export default defineApplication({
  universalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
  displayName: 'Hoo partners',
  description:
    'Partner pipeline, treatment catalog, and the products each partner offers.',
  logoUrl: 'public/hoo-logo.svg',
  // Workspace-level, so they are set in Settings > Applications rather than by the server admin.
  applicationVariables: {
    WORKER_URL: {
      universalIdentifier: '285e7e5a-13c3-4d9b-8594-35fb6a401225',
      description: 'hoo-rx worker base URL, e.g. http://localhost:8787',
      isSecret: false,
    },
    WORKER_TOKEN: {
      universalIdentifier: '6aa07655-6a15-4066-b7c7-cfa804b8963a',
      description: 'Bearer token the worker requires (WORKER_TOKEN in hoo-rx). Empty for a local worker.',
      isSecret: true,
    },
  },
});
