import { defineCommandMenuItem } from 'twenty-sdk/define';

import { PUBLISH_CHANGES_FRONT_COMPONENT_ID } from 'src/components/publish-changes.front-component';
import { PARTNER_OBJECT_ID } from 'src/constants/identifiers';

export default defineCommandMenuItem({
  universalIdentifier: '7d4b3203-a55c-45f2-973e-aa21da12e76f',
  label: 'Publish changes',
  shortLabel: 'Publish',
  isPinned: true,
  availabilityType: 'RECORD_SELECTION',
  availabilityObjectUniversalIdentifier: PARTNER_OBJECT_ID,
  frontComponentUniversalIdentifier: PUBLISH_CHANGES_FRONT_COMPONENT_ID,
});
