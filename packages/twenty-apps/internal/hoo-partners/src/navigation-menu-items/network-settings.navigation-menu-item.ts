import { defineNavigationMenuItem, NavigationMenuItemType } from 'twenty-sdk/define';

import { NETWORK_SETTINGS_OBJECT_ID } from 'src/constants/identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: 'c39266c8-61b2-4d44-af3c-1aceddbe4f32',
  position: 20,
  type: NavigationMenuItemType.OBJECT,
  targetObjectUniversalIdentifier: NETWORK_SETTINGS_OBJECT_ID,
});
