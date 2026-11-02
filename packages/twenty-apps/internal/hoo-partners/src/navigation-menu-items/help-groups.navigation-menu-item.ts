import { defineNavigationMenuItem, NavigationMenuItemType } from 'twenty-sdk/define';

import { HELP_GROUP_OBJECT_ID } from 'src/constants/identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: 'c38d91a6-8ffb-49b0-915f-e7735c9ad855',
  position: 5,
  type: NavigationMenuItemType.OBJECT,
  targetObjectUniversalIdentifier: HELP_GROUP_OBJECT_ID,
});
