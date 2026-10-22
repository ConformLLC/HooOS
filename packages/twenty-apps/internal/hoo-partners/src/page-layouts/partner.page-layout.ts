import { definePageLayout, PageLayoutTabLayoutMode } from 'twenty-sdk/define';

import { PARTNER_OBJECT_ID } from 'src/constants/identifiers';
import { PARTNER_RECORD_FIELDS_VIEW_ID } from 'src/views/partner-record-fields.view';

export default definePageLayout({
  universalIdentifier: 'c8a1d0e2-4f63-4a17-9b55-6e2c1a8d0f44',
  name: 'Partner',
  type: 'RECORD_PAGE',
  objectUniversalIdentifier: PARTNER_OBJECT_ID,
  tabs: [
    {
      universalIdentifier: 'd19b2e33-5a74-4b28-8c66-7f3d2b9e1045',
      title: 'Home',
      position: 0,
      icon: 'IconHome',
      layoutMode: PageLayoutTabLayoutMode.VERTICAL_LIST,
      widgets: [
        {
          universalIdentifier: 'e2ac3f44-6b85-4c39-9d77-804e3c0f2156',
          title: 'Partner',
          type: 'FIELDS',
          configuration: {
            configurationType: 'FIELDS',
            viewUniversalIdentifier: PARTNER_RECORD_FIELDS_VIEW_ID,
          },
        },
      ],
    },
  ],
});
