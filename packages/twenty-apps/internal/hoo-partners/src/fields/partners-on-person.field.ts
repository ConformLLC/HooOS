import {
  defineField,
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

import {
  PARTNER_CONTACT_FIELD_ID,
  PARTNER_OBJECT_ID,
  PARTNERS_ON_PERSON_FIELD_ID,
} from 'src/constants/identifiers';

export default defineField({
  universalIdentifier: PARTNERS_ON_PERSON_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  type: FieldType.RELATION,
  name: 'partners',
  label: 'Partners',
  description: 'Partner records this person is the contact for.',
  icon: 'IconBuildingSkyscraper',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier: PARTNER_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier: PARTNER_CONTACT_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
  isUIEditable: false,
});
