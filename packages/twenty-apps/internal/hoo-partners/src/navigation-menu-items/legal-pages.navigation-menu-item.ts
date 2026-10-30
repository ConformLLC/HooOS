import { defineNavigationMenuItem, NavigationMenuItemType } from 'twenty-sdk/define';

import { LEGAL_PAGE_OBJECT_ID } from 'src/constants/identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: '2ed722b8-deb0-4aef-9639-067bfcc984b5',
  position: 6,
  type: NavigationMenuItemType.OBJECT,
  targetObjectUniversalIdentifier: LEGAL_PAGE_OBJECT_ID,
});
