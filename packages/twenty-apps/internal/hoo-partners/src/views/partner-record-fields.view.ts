import { defineView, ViewType } from 'twenty-sdk/define';

import {
  PARTNER_BRANDING_FIELD_ID,
  PARTNER_CONTACT_FIELD_ID,
  PARTNER_NAME_FIELD_ID,
  PARTNER_OBJECT_ID,
  PARTNER_PATH_FIELD_ID,
  PARTNER_RX_STATUS_FIELD_ID,
  PARTNER_SLUG_FIELD_ID,
  PARTNER_STAGE_FIELD_ID,
  PARTNER_TREATMENTS_ON_PARTNER_FIELD_ID,
  PARTNER_WEBSITE_FIELD_ID,
} from 'src/constants/identifiers';

const LOGO_FIELD_ID = '5b835dcf-191e-4c22-8a23-3a1505a18ee7';
const BRAND_COLORS_FIELD_ID = '8bc354a0-0cbc-4a0e-b7f4-fb624299db88';
const NOTES_FIELD_ID = '3f7c6b64-4cc8-4e4f-80b0-14fbd123a798';
const REQUESTED_PRODUCTS_FIELD_ID = 'f6eb32c8-dc59-45f7-86e8-44502c8dcabd';

const FIELD_IDS = [
  PARTNER_NAME_FIELD_ID,
  PARTNER_SLUG_FIELD_ID,
  PARTNER_STAGE_FIELD_ID,
  PARTNER_PATH_FIELD_ID,
  PARTNER_BRANDING_FIELD_ID,
  PARTNER_WEBSITE_FIELD_ID,
  LOGO_FIELD_ID,
  BRAND_COLORS_FIELD_ID,
  PARTNER_CONTACT_FIELD_ID,
  REQUESTED_PRODUCTS_FIELD_ID,
  NOTES_FIELD_ID,
  PARTNER_RX_STATUS_FIELD_ID,
  PARTNER_TREATMENTS_ON_PARTNER_FIELD_ID,
];

const VIEW_FIELD_IDS = [
  '0a6e1b22-3c44-4d55-8e66-1f7a8b9c0d11',
  '1b7f2c33-4d55-4e66-9f77-208b9c0d1e22',
  '2c804d44-5e66-4f77-a088-319c0d1e2f33',
  '3d915e55-6f77-4088-b199-42ad1e2f3044',
  '4ea26f66-7088-4199-82aa-53be2f304155',
  'd4ec0d94-9790-41f3-9641-839ddeabff82',
  '60c48188-92aa-43bb-a4cc-75d041526377',
  '71d59299-a3bb-44cc-85dd-86e152637488',
  '82e6a3aa-b4cc-45dd-96ee-97f263748599',
  '93f7b4bb-c5dd-46ee-a7ff-a803748596a0',
  'a408c5cc-d6ee-47ff-b800-b9148596a7b1',
  'b519d6dd-e7ff-4800-8911-ca258697b8c2',
  'c62ae7ee-f800-4911-9a22-db3697a8c9d3',
  'd73bf8ff-0911-4a22-ab33-ec47a8b9dae4',
  'e84c0900-1a22-4b33-bc44-fd58b9caebf5',
];

export const PARTNER_RECORD_FIELDS_VIEW_ID =
  'f3bd4055-7c96-4d4a-ae88-915f4d103267';

export default defineView({
  universalIdentifier: PARTNER_RECORD_FIELDS_VIEW_ID,
  name: 'Partner fields',
  objectUniversalIdentifier: PARTNER_OBJECT_ID,
  type: ViewType.FIELDS_WIDGET,
  fields: FIELD_IDS.map((fieldMetadataUniversalIdentifier, index) => ({
    universalIdentifier: VIEW_FIELD_IDS[index],
    fieldMetadataUniversalIdentifier,
    position: index,
    isVisible: true,
  })),
});
