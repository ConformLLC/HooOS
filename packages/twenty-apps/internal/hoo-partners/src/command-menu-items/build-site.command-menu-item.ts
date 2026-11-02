import { defineCommandMenuItem } from 'twenty-sdk/define';

import { BUILD_SITE_FRONT_COMPONENT_ID } from 'src/components/build-site.front-component';
import { PARTNER_OBJECT_ID } from 'src/constants/identifiers';

export default defineCommandMenuItem({
  universalIdentifier: '8effefb5-a544-4545-90a0-1f45811dee3a',
  label: 'Build site',
  shortLabel: 'Build site',
  isPinned: true,
  availabilityType: 'RECORD_SELECTION',
  availabilityObjectUniversalIdentifier: PARTNER_OBJECT_ID,
  frontComponentUniversalIdentifier: BUILD_SITE_FRONT_COMPONENT_ID,
});
