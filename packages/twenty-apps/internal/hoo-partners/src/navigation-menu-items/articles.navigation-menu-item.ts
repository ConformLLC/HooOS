import { defineNavigationMenuItem, NavigationMenuItemType } from 'twenty-sdk/define';

import { ARTICLE_OBJECT_ID } from 'src/constants/identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: 'c70ed4f0-5ca3-4bc6-ade5-a59017d07aa8',
  position: 2,
  type: NavigationMenuItemType.OBJECT,
  targetObjectUniversalIdentifier: ARTICLE_OBJECT_ID,
});
