export const PARTNER_OBJECT_ID = 'eec4b8c0-b0cf-4ef2-a9fb-25094db59dfb';
export const TREATMENT_OBJECT_ID = 'ff7537c3-663f-4c0a-a48f-4d825a4d4ef7';
export const PARTNER_TREATMENT_OBJECT_ID = 'eedb47c4-939e-4c3c-b9b8-759979b39b33';

export const PARTNER_NAME_FIELD_ID = '5ef77614-afc6-4c8d-82e8-2d05cee7d32b';
export const PARTNER_SLUG_FIELD_ID = '034c5624-b8e4-48ea-aa26-aa212b111bc0';
export const PARTNER_STAGE_FIELD_ID = '97569bbd-3093-4c55-8fcf-a3d28f249b5b';
export const PARTNER_PATH_FIELD_ID = 'ee6ab66e-8733-4e5e-ad8d-1d411e2062d5';
export const PARTNER_BRANDING_FIELD_ID = '6b6f423a-cf6c-43a6-aaf6-9a4bd196cb21';
export const PARTNER_WEBSITE_FIELD_ID = 'ba25f6b6-57fc-46d7-bea0-0c13225cfef8';
export const PARTNER_RX_STATUS_FIELD_ID = '15af7491-55c3-4553-b05b-999ca334060a';
export const PARTNER_CONTACT_FIELD_ID = '16a9defb-b767-4d8d-99a0-a30a7bb5e353';
export const PARTNERS_ON_PERSON_FIELD_ID = '0b11481d-0eba-42e1-9946-505b86e2132b';

export const PARTNER_TREATMENTS_ON_PARTNER_FIELD_ID =
  '530d4abc-afed-417f-aaee-b61c4f444576';
export const PARTNER_ON_PARTNER_TREATMENT_FIELD_ID =
  'fb5b7b7c-9197-4d70-a5bc-52d77d2ac8ba';
export const TREATMENT_ON_PARTNER_TREATMENT_FIELD_ID =
  '2c4d2cc6-5f9b-487c-8add-60d56aa01553';
export const PARTNER_TREATMENTS_ON_TREATMENT_FIELD_ID =
  '1754db7d-3fa6-4d5b-be00-fb9b9e648122';

export const TREATMENT_NAME_FIELD_ID = '856eb22d-1728-4c2e-b4f6-62291f4ab74b';

export const PARTNER_STAGE_APPLIED = 'APPLIED';
export const PARTNER_STAGE_INTRO_CALL_DONE = 'INTRO_CALL_DONE';
export const PARTNER_STAGE_BUILDING = 'BUILDING';
export const PARTNER_STAGE_AGREEMENT_SIGNED = 'AGREEMENT_SIGNED';

export const PARTNER_STAGE_OPTIONS = [
  { id: '387b1384-5044-4698-b60c-6774d1ecd67f', value: PARTNER_STAGE_APPLIED, label: 'Applied', color: 'gray', position: 0 },
  { id: 'd35ad2ad-333c-4317-8cfe-449c2a795208', value: PARTNER_STAGE_INTRO_CALL_DONE, label: 'Intro call done', color: 'blue', position: 1 },
  { id: '1b665b48-e972-4784-905b-82de1fdf637a', value: PARTNER_STAGE_BUILDING, label: 'Building', color: 'orange', position: 2 },
  { id: '79f6851f-0376-48dc-ad57-021dcf1b09a1', value: PARTNER_STAGE_AGREEMENT_SIGNED, label: 'Agreement signed', color: 'green', position: 3 },
] as const;

// Content center: the shared library every partner site is built from.
export const CATEGORY_OBJECT_ID = 'c79c1fb0-c0fd-4498-90ea-ad4eade02142';
export const TOPIC_OBJECT_ID = '806164ad-e5a6-4ea3-808f-669c02a45d13';
export const ARTICLE_OBJECT_ID = '14156343-3e99-4f9e-8b21-4d9457c09757';
export const LEGAL_PAGE_OBJECT_ID = '22f9e81f-e841-4193-8766-0e3c39325d64';
export const HELP_GROUP_OBJECT_ID = '393d69ff-d988-4af7-95a6-fe8db3e9da46';
export const FAQ_ITEM_OBJECT_ID = '5ea08f1f-646f-4858-97d4-e87663f5bf54';
export const CITATION_OBJECT_ID = 'ac2e16cc-2697-4cf4-9a16-d49c19c911ec';
export const CONTENT_OPT_OUT_OBJECT_ID = 'afdff4ef-4af0-4701-84fd-220e66541d02';

export const CATEGORY_LABEL_FIELD_ID = 'cbdceb30-9263-40ed-85c1-05c77c65b4ad';
export const TOPIC_LABEL_FIELD_ID = '339f97ea-8572-4644-a2ad-b243af2cef30';
export const ARTICLE_TITLE_FIELD_ID = 'a7a626cc-1058-4494-809c-483bac815be7';
export const LEGAL_PAGE_LABEL_FIELD_ID = '7a80f8f8-79e5-4d3f-8b12-e07e05fcf30c';
export const HELP_GROUP_TITLE_FIELD_ID = '09e03288-55ba-49e7-9602-83ced37c457f';
export const FAQ_ITEM_QUESTION_FIELD_ID = 'd700328c-9cab-40ca-92bd-7f3def37e3d0';
export const CITATION_TITLE_FIELD_ID = 'c07c8fae-4d6b-4ef0-9ed0-4b9a314044ef';
export const CONTENT_OPT_OUT_NAME_FIELD_ID = 'db19904b-4101-40d0-8439-5dcd57154648';

// Relation pairs: <many side>_ON_<one side> and <one side>_<many side>.
export const CATEGORY_ON_TREATMENT_FIELD_ID = '6e38a7dd-0e34-4815-b931-9cfd8573a42a';
export const TREATMENTS_ON_CATEGORY_FIELD_ID = 'f9deb713-cad9-4f06-aea4-d50ba3b43a20';
export const TOPIC_ON_ARTICLE_FIELD_ID = '249d6e66-dc70-44d9-8c95-4af1c2103d49';
export const ARTICLES_ON_TOPIC_FIELD_ID = 'cc41b722-f4f8-400d-b747-47ebcab625bd';
export const TREATMENT_ON_FAQ_ITEM_FIELD_ID = '2a49d2d0-3f5b-4bca-a8df-68e1129f4182';
export const FAQ_ITEMS_ON_TREATMENT_FIELD_ID = '674c24c7-abe2-49e5-9396-60c4e423200e';
export const ARTICLE_ON_FAQ_ITEM_FIELD_ID = 'f7082344-a3da-4a67-b0b5-2d2795eb1b21';
export const FAQ_ITEMS_ON_ARTICLE_FIELD_ID = 'd83445ac-39e9-42d4-8574-5f61c68f814d';
export const HELP_GROUP_ON_FAQ_ITEM_FIELD_ID = 'e06169cb-afcf-45d3-ad06-835f07fa37d3';
export const FAQ_ITEMS_ON_HELP_GROUP_FIELD_ID = '9d98fa1f-0f4d-4885-89ba-6ac83df37b11';
export const TREATMENT_ON_CITATION_FIELD_ID = 'd4405374-e5d0-43c6-814d-a0f3b4aaf4e9';
export const CITATIONS_ON_TREATMENT_FIELD_ID = '3b4fdf7a-31a9-4c05-b2ca-d778ba2ef96c';
export const ARTICLE_ON_CITATION_FIELD_ID = 'de474492-32fe-497a-aece-e4c573fe8db0';
export const CITATIONS_ON_ARTICLE_FIELD_ID = '5aecf23d-5e16-4e89-9860-f50385b7e849';
export const PARTNER_ON_CONTENT_OPT_OUT_FIELD_ID = '41fb00fb-6ea8-494c-829d-1f779d7517d5';
export const CONTENT_OPT_OUTS_ON_PARTNER_FIELD_ID = 'a3964094-c5c6-455e-b654-51e775f8ca20';
export const TOPIC_ON_CONTENT_OPT_OUT_FIELD_ID = 'fd5d7f8e-ffc6-4421-b8b9-49f6a1c24351';
export const CONTENT_OPT_OUTS_ON_TOPIC_FIELD_ID = 'e0744dda-589b-4a26-b64f-daddfbd4bc67';
export const ARTICLE_ON_CONTENT_OPT_OUT_FIELD_ID = '0a76aaf9-dc25-4ea4-8a63-4de408f5e4c7';
export const CONTENT_OPT_OUTS_ON_ARTICLE_FIELD_ID = '753751fb-b004-4aca-9788-afad969473e8';

// Review status shared by every content object. The worker exports only
// APPROVED and PUBLISHED records; PUBLISHED is set once the PR has merged.
export const CONTENT_STATUS_DRAFT = 'DRAFT';
export const CONTENT_STATUS_IN_REVIEW = 'IN_REVIEW';
export const CONTENT_STATUS_APPROVED = 'APPROVED';
export const CONTENT_STATUS_PUBLISHED = 'PUBLISHED';
export const CONTENT_STATUS_ARCHIVED = 'ARCHIVED';
