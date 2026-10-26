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
