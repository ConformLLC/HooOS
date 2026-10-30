import { defineNavigationMenuItem, NavigationMenuItemType } from 'twenty-sdk/define';

import { TOPIC_OBJECT_ID } from 'src/constants/identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: '56a805e7-60a3-44a7-9501-8dbd7ba0abe0',
  position: 4,
  type: NavigationMenuItemType.OBJECT,
  targetObjectUniversalIdentifier: TOPIC_OBJECT_ID,
});
