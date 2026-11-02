import { defineCommandMenuItem } from 'twenty-sdk/define';

import { PUBLISH_CONTENT_FRONT_COMPONENT_ID } from 'src/components/publish-content.front-component';

export default defineCommandMenuItem({
  universalIdentifier: 'a1cf9ce8-a334-4f07-90d2-60d2596f554b',
  label: 'Publish content',
  shortLabel: 'Publish content',
  availabilityType: 'GLOBAL',
  frontComponentUniversalIdentifier: PUBLISH_CONTENT_FRONT_COMPONENT_ID,
});
