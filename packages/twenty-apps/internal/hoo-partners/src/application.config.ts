import { defineApplication } from 'twenty-sdk/define';

export const APPLICATION_UNIVERSAL_IDENTIFIER =
  '78d4c86f-c00f-405b-8937-676b99a29a67';

export default defineApplication({
  universalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
  displayName: 'Hoo partners',
  description:
    'Partner pipeline, treatment catalog, and the products each partner offers.',
  serverVariables: {
    WORKER_URL: {
      description: 'hoo-rx worker base URL, e.g. http://localhost:8787',
      isSecret: false,
      isRequired: true,
    },
    WORKER_TOKEN: {
      description: 'Bearer token the worker requires (WORKER_TOKEN in hoo-rx). Empty for a local worker.',
      isSecret: true,
      isRequired: false,
    },
  },
});
