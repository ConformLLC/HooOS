import { defineObject, FieldType } from 'twenty-sdk/define';

import {
  LEGAL_PAGE_LABEL_FIELD_ID,
  LEGAL_PAGE_OBJECT_ID,
} from 'src/constants/identifiers';
import { contentStatusFields, seoFields, slugField } from 'src/utils/content-fields';

export default defineObject({
  universalIdentifier: LEGAL_PAGE_OBJECT_ID,
  nameSingular: 'legalPage',
  namePlural: 'legalPages',
  labelSingular: 'Legal page',
  labelPlural: 'Legal pages',
  description:
    'HOO legal templates (privacy, terms, telehealth consent, refunds, shipping, safety), filled with each partner’s facts.',
  icon: 'IconScale',
  labelIdentifierFieldMetadataUniversalIdentifier: LEGAL_PAGE_LABEL_FIELD_ID,
  fields: [
    {
      universalIdentifier: LEGAL_PAGE_LABEL_FIELD_ID,
      type: FieldType.TEXT,
      name: 'label',
      label: 'Label',
      description: 'Footer link text, e.g. "Privacy policy".',
      icon: 'IconAbc',
    },
    slugField('48a1343a-1241-4c6a-a5a8-68fae2bdf467', 'Page path, e.g. "privacy".'),
    ...seoFields('d749f3c0-e580-400a-bad3-b35ed4131238', '4bf58155-04cb-4bd2-aa1b-900506192f62'),
    {
      universalIdentifier: 'c9927bec-eb93-4d09-933e-15108ce6776d',
      type: FieldType.RICH_TEXT,
      name: 'body',
      label: 'Body',
      description:
        'Start each section with a heading. May use {brand}, {legalName}, {email}, {phone}, {domain} and {states}.',
      icon: 'IconFileText',
    },
    ...contentStatusFields({
      status: 'f8352d90-3c27-4bad-81b7-d3e4c8929c61',
      options: ['eb3247af-612b-43dd-bf1e-538a87160fbb', 'ad90f52b-b77d-4b43-a354-62f3ec495d3c', 'f5a2b356-2737-4e9a-abfe-ca4804362f2e', '8b656ceb-d288-4d98-a35d-46844460d4bb', '6e63c390-5835-46c5-a56f-4d1d2460d778'],
      approvedAt: '369cff4f-2564-4fc1-a365-64fdb0615750',
      publishedAt: '66c7ccbe-d016-44ba-bdb6-74250fcba3e0',
      reviewNotes: 'e865265c-8c88-4dec-b32d-37c44af60d0c',
    }),
  ],
});
