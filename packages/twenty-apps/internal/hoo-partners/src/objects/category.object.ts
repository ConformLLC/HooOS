import { defineObject, FieldType, RelationType } from 'twenty-sdk/define';

import {
  CATEGORY_LABEL_FIELD_ID,
  CATEGORY_OBJECT_ID,
  CATEGORY_ON_TREATMENT_FIELD_ID,
  TREATMENT_OBJECT_ID,
  TREATMENTS_ON_CATEGORY_FIELD_ID,
} from 'src/constants/identifiers';
import { answerField, contentStatusFields, seoFields, slugField } from 'src/utils/content-fields';

export default defineObject({
  universalIdentifier: CATEGORY_OBJECT_ID,
  nameSingular: 'category',
  namePlural: 'categories',
  labelSingular: 'Category',
  labelPlural: 'Categories',
  description: 'A program category. Each one has its own page on every partner site.',
  icon: 'IconCategory',
  labelIdentifierFieldMetadataUniversalIdentifier: CATEGORY_LABEL_FIELD_ID,
  fields: [
    {
      universalIdentifier: CATEGORY_LABEL_FIELD_ID,
      type: FieldType.TEXT,
      name: 'label',
      label: 'Label',
      description: 'Menu label, e.g. "Daily Wellness".',
      icon: 'IconAbc',
    },
    slugField('72e7034e-24af-4032-b094-64477e380431', 'Page path, e.g. "daily-wellness".'),
    ...seoFields('f8f0b7c2-f2e4-46b7-931d-3c7620ab84b1', '39391232-9508-483b-9c6a-7cc2b153b21b'),
    answerField('4583b651-00e2-429c-8ab4-40a444613ceb'),
    {
      universalIdentifier: '74009f2a-4507-43db-9da8-b3920d46fa62',
      type: FieldType.ARRAY,
      name: 'intro',
      label: 'Intro paragraphs',
      icon: 'IconAlignJustified',
      isNullable: true,
    },
    ...contentStatusFields({
      status: '030ac73b-c0ce-4d11-861a-d044771db1d4',
      options: ['16200e7b-7b13-45b1-8ad9-e403c17d45f6', '44a4b7f9-ade6-4e47-b7a6-1ef5a53b718e', 'a3261edb-1378-4c81-91c9-65ad2ee1b59e', '4ba7ac85-0f91-40c4-903c-9016a3de53cc', '61afa19b-b30a-4c70-80a4-591ba478d3da'],
      approvedAt: 'd01b3ff4-c176-47cf-b080-1f7662b682a3',
      publishedAt: '559b8aa4-467d-49d2-8ef8-e30561104229',
      reviewNotes: 'd72116f0-be75-492d-ac89-a4a9457d3543',
    }),
    {
      universalIdentifier: TREATMENTS_ON_CATEGORY_FIELD_ID,
      type: FieldType.RELATION,
      name: 'treatments',
      label: 'Treatments',
      icon: 'IconFlask',
      isNullable: true,
      relationTargetObjectMetadataUniversalIdentifier: TREATMENT_OBJECT_ID,
      relationTargetFieldMetadataUniversalIdentifier: CATEGORY_ON_TREATMENT_FIELD_ID,
      universalSettings: { relationType: RelationType.ONE_TO_MANY },
    },
  ],
});
