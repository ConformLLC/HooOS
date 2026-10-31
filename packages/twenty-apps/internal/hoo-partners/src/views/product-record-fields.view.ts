import { defineView, ViewType } from 'twenty-sdk/define';

import { CATEGORY_ON_TREATMENT_FIELD_ID, TREATMENT_OBJECT_ID } from 'src/constants/identifiers';

// The product page's details panel, in the order Chethan reads it: where it stands, what it is, then SEO and history.
// The Description, FAQ and Sources have their own widgets on the page.
const FIELDS: [string, string][] = [
  ['bc2feb8a-8b72-4b49-817a-d5ec31e8c26c', 'b08842c1-d2a1-413d-9d7a-647d9ccd9d60'], // status
  [CATEGORY_ON_TREATMENT_FIELD_ID, '8de22f93-ad91-43ae-89d0-a5458bb4a781'], // category
  ['c6c1294f-b33e-40a2-b5d9-f22474418a28', '253f3dcb-17ad-4fac-97a1-5e6df7e9c82b'], // answer
  ['70a6823a-dcaf-4fa7-9b79-e01739375c76', '5d69e055-6bf4-4633-8686-301842d632b9'], // format
  ['a4d3c830-bcdd-4bfe-be31-0a51daf80c85', 'd41c4a16-4298-4b35-8652-40de83df5344'], // tag
  ['47df1361-70e8-41cc-92a6-fb3d21122842', '42564687-886b-43a9-9b52-955082116b38'], // rx
  ['911f7ac0-a31b-4761-897e-dd1fc3f22f93', '31d9645e-4d21-4f0b-ba85-f561e97561af'], // compounded
  ['aa710cf9-8be4-4fce-96cf-cde907ea2f9b', '528cdb0a-c9aa-4bc5-92b5-c403871216a7'], // container
  ['5d43e343-f2ba-438c-8388-ecfe50c78ea2', '23358854-dd4c-4d54-b204-2ba24f9c29bc'], // active
  ['52d8b64e-24b0-4491-bb42-d2fe9cf2ea40', 'f30f144c-ac90-4b23-bf46-648fbc351280'], // seoTitle
  ['4e187164-5793-4e20-8b5b-07757534b9cd', '4ec6d725-7fa6-4207-919a-d6de2efb9ae1'], // seoDescription
  ['08d5246e-3484-4c02-ab55-f6feb3a56e63', '22696226-7d19-46e0-9ddb-837b0b8104d4'], // slug
  ['71fe1996-0dbf-481d-8df4-133d68bb51d0', '8bddeb10-7f72-4dee-9f7a-73b7a28163d4'], // image
  ['8c0cf585-ea58-49d0-886d-560b834efe20', 'e550f32c-ab8f-4792-9eb7-090aa2028a24'], // reviewNotes
  ['bfabf8f2-9311-4fae-a114-0b66cd607512', 'e3c7f5f8-49ad-4d58-b0b4-da0d128802ca'], // approvedAt
  ['5c6cb2ef-4260-4e3a-bba1-a25959db060f', 'cc5dff2e-4c3a-4677-a674-966cdaa000ca'], // publishedAt
];

export const PRODUCT_RECORD_FIELDS_VIEW_ID = '990f8694-5e61-49b5-af9f-c0bc9d930f00';

export default defineView({
  universalIdentifier: PRODUCT_RECORD_FIELDS_VIEW_ID,
  name: 'Product details',
  objectUniversalIdentifier: TREATMENT_OBJECT_ID,
  type: ViewType.FIELDS_WIDGET,
  fields: FIELDS.map(([fieldMetadataUniversalIdentifier, universalIdentifier], position) => ({
    universalIdentifier,
    fieldMetadataUniversalIdentifier,
    position,
    isVisible: true,
  })),
});
