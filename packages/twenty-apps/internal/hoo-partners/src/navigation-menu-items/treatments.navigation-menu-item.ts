import { defineNavigationMenuItem, NavigationMenuItemType } from 'twenty-sdk/define';

import { TREATMENT_OBJECT_ID } from 'src/constants/identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: '3742533f-6e71-4f2f-b616-f4797bcf1a43',
  position: 1,
  type: NavigationMenuItemType.OBJECT,
  targetObjectUniversalIdentifier: TREATMENT_OBJECT_ID,
});
