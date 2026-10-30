import { defineNavigationMenuItem, NavigationMenuItemType } from 'twenty-sdk/define';

import { CATEGORY_OBJECT_ID } from 'src/constants/identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: '0601a0f8-d3f6-4345-8ec1-9002e40360c5',
  position: 3,
  type: NavigationMenuItemType.OBJECT,
  targetObjectUniversalIdentifier: CATEGORY_OBJECT_ID,
});
