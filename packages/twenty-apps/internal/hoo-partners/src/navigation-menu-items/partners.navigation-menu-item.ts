import { defineNavigationMenuItem, NavigationMenuItemType } from 'twenty-sdk/define';

import { PARTNER_OBJECT_ID } from 'src/constants/identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: '98d4bf1b-c71c-4715-a922-62ca0767482c',
  position: 0,
  type: NavigationMenuItemType.OBJECT,
  targetObjectUniversalIdentifier: PARTNER_OBJECT_ID,
});
