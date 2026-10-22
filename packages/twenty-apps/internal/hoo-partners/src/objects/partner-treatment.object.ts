import {
  defineObject,
  FieldType,
  OnDeleteAction,
  RelationType,
} from 'twenty-sdk/define';

import {
  PARTNER_OBJECT_ID,
  PARTNER_ON_PARTNER_TREATMENT_FIELD_ID,
  PARTNER_TREATMENT_OBJECT_ID,
  PARTNER_TREATMENTS_ON_PARTNER_FIELD_ID,
  PARTNER_TREATMENTS_ON_TREATMENT_FIELD_ID,
  TREATMENT_OBJECT_ID,
  TREATMENT_ON_PARTNER_TREATMENT_FIELD_ID,
} from 'src/constants/identifiers';

export default defineObject({
  universalIdentifier: PARTNER_TREATMENT_OBJECT_ID,
  nameSingular: 'partnerTreatment',
  namePlural: 'partnerTreatments',
  labelSingular: 'Partner product',
  labelPlural: 'Partner products',
  description:
    'A catalog treatment Hoo has turned on for one partner, with that partner’s price and intake link.',
  icon: 'IconPill',
  labelIdentifierFieldMetadataUniversalIdentifier:
    'b215ea7f-194c-4937-b81d-be09d41071b3',
  fields: [
    {
      universalIdentifier: 'b215ea7f-194c-4937-b81d-be09d41071b3',
      type: FieldType.TEXT,
      name: 'name',
      label: 'Name',
      description: 'Shown on the record. Usually the treatment name.',
      icon: 'IconAbc',
      isNullable: true,
    },
    {
      universalIdentifier: PARTNER_ON_PARTNER_TREATMENT_FIELD_ID,
      type: FieldType.RELATION,
      name: 'partner',
      label: 'Partner',
      icon: 'IconBuildingSkyscraper',
      relationTargetObjectMetadataUniversalIdentifier: PARTNER_OBJECT_ID,
      relationTargetFieldMetadataUniversalIdentifier:
        PARTNER_TREATMENTS_ON_PARTNER_FIELD_ID,
      universalSettings: {
        relationType: RelationType.MANY_TO_ONE,
        onDelete: OnDeleteAction.CASCADE,
        joinColumnName: 'partnerId',
      },
    },
    {
      universalIdentifier: TREATMENT_ON_PARTNER_TREATMENT_FIELD_ID,
      type: FieldType.RELATION,
      name: 'treatment',
      label: 'Treatment',
      icon: 'IconFlask',
      relationTargetObjectMetadataUniversalIdentifier: TREATMENT_OBJECT_ID,
      relationTargetFieldMetadataUniversalIdentifier:
        PARTNER_TREATMENTS_ON_TREATMENT_FIELD_ID,
      universalSettings: {
        relationType: RelationType.MANY_TO_ONE,
        onDelete: OnDeleteAction.CASCADE,
        joinColumnName: 'treatmentId',
      },
    },
    {
      universalIdentifier: '5a67dd90-d242-4b20-9528-871e1be1b28e',
      type: FieldType.BOOLEAN,
      name: 'enabled',
      label: 'Enabled',
      icon: 'IconCheck',
      defaultValue: true,
    },
    {
      universalIdentifier: '4d3c6378-0acf-4be6-a3db-0ec0295f613f',
      type: FieldType.CURRENCY,
      name: 'price',
      label: 'Price',
      description: 'The price the partner set. Hoo types it in.',
      icon: 'IconCurrencyDollar',
      isNullable: true,
    },
    {
      universalIdentifier: '8ca2218b-03df-43b3-b7bb-8d1f092a2ce5',
      type: FieldType.TEXT,
      name: 'intakeLink',
      label: 'Intake link',
      icon: 'IconExternalLink',
      isNullable: true,
    },
  ],
});
