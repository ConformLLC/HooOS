import { defineView, ViewType } from 'twenty-sdk/define';

import {
  PARTNER_NAME_FIELD_ID,
  PARTNER_OBJECT_ID,
  PARTNER_PATH_FIELD_ID,
  PARTNER_STAGE_FIELD_ID,
  PARTNER_STAGE_OPTIONS,
  PARTNER_WEBSITE_FIELD_ID,
} from 'src/constants/identifiers';

const GROUP_IDS = [
  '5fddb3a1-9a9d-45b4-86e3-7ef6d05f8abd',
  'cbce7ecc-a6fd-479f-a2e5-d6d918bcc639',
  '3fc18089-f142-41e8-bcec-6606835a29fb',
  'a7c31e20-6b14-4d55-9e08-2f6a91c0d4b8',
];

export default defineView({
  universalIdentifier: 'b8e24f10-91aa-4c33-a710-6d5e0c4b2a19',
  name: 'Pipeline',
  objectUniversalIdentifier: PARTNER_OBJECT_ID,
  type: ViewType.KANBAN,
  icon: 'IconLayoutKanban',
  position: 0,
  mainGroupByFieldMetadataUniversalIdentifier: PARTNER_STAGE_FIELD_ID,
  fields: [
    { universalIdentifier: 'c4d90a11-2e77-4b18-8f33-1a0b6c5d7e90', fieldMetadataUniversalIdentifier: PARTNER_NAME_FIELD_ID, position: 0, isVisible: true, size: 200 },
    { universalIdentifier: 'e6fb2c33-4099-4d3a-a155-3c2d8e7f9012', fieldMetadataUniversalIdentifier: PARTNER_PATH_FIELD_ID, position: 1, isVisible: true, size: 160 },
    { universalIdentifier: '8832f796-df6d-4e38-a8cd-aa269b05f752', fieldMetadataUniversalIdentifier: PARTNER_WEBSITE_FIELD_ID, position: 2, isVisible: true, size: 220 },
  ],
  groups: PARTNER_STAGE_OPTIONS.map((option, index) => ({
    universalIdentifier: GROUP_IDS[index],
    fieldValue: option.value,
    position: index,
    isVisible: true,
  })),
});
