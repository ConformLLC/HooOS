import { defineCommandMenuItem } from 'twenty-sdk/define';

import { PREVIEW_BRAND_FRONT_COMPONENT_ID } from 'src/components/preview-brand.front-component';
import { PARTNER_OBJECT_ID } from 'src/constants/identifiers';

export default defineCommandMenuItem({
  universalIdentifier: '2055bdcc-0d81-4f1c-8e2a-110b6407f3d5',
  label: 'Preview brand',
  shortLabel: 'Preview brand',
  isPinned: true,
  availabilityType: 'RECORD_SELECTION',
  availabilityObjectUniversalIdentifier: PARTNER_OBJECT_ID,
  frontComponentUniversalIdentifier: PREVIEW_BRAND_FRONT_COMPONENT_ID,
});
