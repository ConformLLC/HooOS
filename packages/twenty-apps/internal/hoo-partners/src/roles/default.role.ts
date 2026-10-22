import { defineApplicationRole } from 'twenty-sdk/define';

export const DEFAULT_APPLICATION_ROLE_ID =
  'a3c8e1f0-6b24-4d11-8e77-1c9a0b4d5e62';

export default defineApplicationRole({
  universalIdentifier: DEFAULT_APPLICATION_ROLE_ID,
  label: 'Hoo partners',
  description: 'Role the Hoo partners app uses. Staff keep their existing workspace role.',
  canReadAllObjectRecords: true,
  canUpdateAllObjectRecords: true,
  canSoftDeleteAllObjectRecords: true,
  canDestroyAllObjectRecords: false,
});
