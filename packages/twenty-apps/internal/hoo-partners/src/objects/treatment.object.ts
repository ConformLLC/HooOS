import {
  defineObject,
  FieldType,
  RelationType,
} from 'twenty-sdk/define';

import {
  PARTNER_TREATMENT_OBJECT_ID,
  PARTNER_TREATMENTS_ON_TREATMENT_FIELD_ID,
  TREATMENT_NAME_FIELD_ID,
  TREATMENT_OBJECT_ID,
  TREATMENT_ON_PARTNER_TREATMENT_FIELD_ID,
} from 'src/constants/identifiers';

export default defineObject({
  universalIdentifier: TREATMENT_OBJECT_ID,
  nameSingular: 'treatment',
  namePlural: 'treatments',
  labelSingular: 'Treatment',
  labelPlural: 'Treatments',
  description: 'Hoo’s catalog. Descriptions here are the approved copy.',
  icon: 'IconFlask',
  labelIdentifierFieldMetadataUniversalIdentifier: TREATMENT_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: TREATMENT_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'name',
      label: 'Name',
      icon: 'IconAbc',
    },
    {
      universalIdentifier: '118fbc3f-01b3-44d4-8b53-2234279c38da',
      type: FieldType.SELECT,
      name: 'category',
      label: 'Category',
      icon: 'IconCategory',
      isNullable: true,
      options: [
        { id: 'a9149a79-6017-4bb0-b7cc-15396d393df2', value: 'WEIGHT', label: 'Weight programs', color: 'blue', position: 0 },
        { id: 'c5ca3fc3-35a0-40db-b449-dbe279434428', value: 'NAD', label: 'NAD+', color: 'purple', position: 1 },
        { id: 'd28dced9-de5f-412b-ba64-bc45bd624dd8', value: 'SERMORELIN', label: 'Sermorelin', color: 'turquoise', position: 2 },
        { id: '67ddd0be-4f0f-4a72-aadc-a0e8a086b540', value: 'GLUTATHIONE', label: 'Glutathione', color: 'green', position: 3 },
        { id: '533fdd31-653b-4fe5-a1d4-6fa016619c4e', value: 'HORMONE', label: 'Hormone and menopause', color: 'pink', position: 4 },
        { id: '4d54f6d0-835b-4a89-a1f3-57664fbe356f', value: 'GHK_CU', label: 'GHK-Cu skin', color: 'orange', position: 5 },
        { id: '8d45814b-e2f9-45b6-861b-5cc15b0ddc16', value: 'HAIR', label: 'Hair programs', color: 'yellow', position: 6 },
        { id: '27925554-ed62-4560-a690-20b5d8f7b335', value: 'SEXUAL_WELLNESS', label: 'Sexual wellness', color: 'red', position: 7 },
      ],
    },
    {
      universalIdentifier: 'a1f5fdbd-a5c0-4333-a06d-7e3afab3321d',
      type: FieldType.TEXT,
      name: 'approvedDescription',
      label: 'Approved description',
      description: 'Catalog copy. A partner page cannot rewrite this.',
      icon: 'IconFileText',
      isNullable: true,
    },
    {
      universalIdentifier: '71fe1996-0dbf-481d-8df4-133d68bb51d0',
      type: FieldType.FILES,
      name: 'image',
      label: 'Image',
      icon: 'IconPhoto',
      isNullable: true,
      universalSettings: { maxNumberOfValues: 1 },
    },
    {
      universalIdentifier: '5d43e343-f2ba-438c-8388-ecfe50c78ea2',
      type: FieldType.BOOLEAN,
      name: 'active',
      label: 'Active',
      icon: 'IconCheck',
      defaultValue: true,
    },
    {
      universalIdentifier: PARTNER_TREATMENTS_ON_TREATMENT_FIELD_ID,
      type: FieldType.RELATION,
      name: 'partnerTreatments',
      label: 'Partner products',
      icon: 'IconLink',
      isNullable: true,
      relationTargetObjectMetadataUniversalIdentifier: PARTNER_TREATMENT_OBJECT_ID,
      relationTargetFieldMetadataUniversalIdentifier:
        TREATMENT_ON_PARTNER_TREATMENT_FIELD_ID,
      universalSettings: {
        relationType: RelationType.ONE_TO_MANY,
      },
    },
  ],
});
