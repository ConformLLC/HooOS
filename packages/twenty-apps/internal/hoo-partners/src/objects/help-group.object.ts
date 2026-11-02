import { defineObject, FieldType, RelationType } from 'twenty-sdk/define';

import {
  FAQ_ITEM_OBJECT_ID,
  FAQ_ITEMS_ON_HELP_GROUP_FIELD_ID,
  HELP_GROUP_OBJECT_ID,
  HELP_GROUP_ON_FAQ_ITEM_FIELD_ID,
  HELP_GROUP_TITLE_FIELD_ID,
} from 'src/constants/identifiers';
import { contentStatusFields, slugField } from 'src/utils/content-fields';

export default defineObject({
  universalIdentifier: HELP_GROUP_OBJECT_ID,
  nameSingular: 'helpGroup',
  namePlural: 'helpGroups',
  labelSingular: 'Help group',
  labelPlural: 'Help groups',
  description: 'A Help Center section, or the general FAQ page.',
  icon: 'IconLifebuoy',
  labelIdentifierFieldMetadataUniversalIdentifier: HELP_GROUP_TITLE_FIELD_ID,
  fields: [
    {
      universalIdentifier: HELP_GROUP_TITLE_FIELD_ID,
      type: FieldType.TEXT,
      name: 'title',
      label: 'Title',
      icon: 'IconAbc',
    },
    slugField('a53ea50e-5221-4edf-aff4-2ea6ceb66e7c', 'Anchor on the Help Center page.'),
    {
      universalIdentifier: 'f444c144-fc2b-4e1c-935f-5097cb107452',
      type: FieldType.SELECT,
      name: 'kind',
      label: 'Shown on',
      icon: 'IconLayoutList',
      defaultValue: `'HELP_CENTER'`,
      options: [
        { id: '2e45b1da-cccb-44d9-ad16-20ee5d7ca163', value: 'HELP_CENTER', label: 'Help Center', color: 'blue', position: 0 },
        { id: '9dc8511c-3f1c-4669-bdd2-2707b305d247', value: 'GENERAL_FAQ', label: 'FAQ page', color: 'purple', position: 1 },
      ],
    },
    ...contentStatusFields({
      status: 'a96a8bdf-f773-4ce9-9927-0d41f9b22a66',
      options: ['d601c762-c9db-499d-85a5-3b9c5b8d3c22', '8005811b-2982-4cff-94d8-96db837f7609', 'd5ca8775-c824-42aa-8c87-d06ab43d60d1', '8346e645-7c53-4a97-ada2-26d7091266cd', 'b666c9de-5c9b-42bd-af06-793b158c349d'],
      approvedAt: '94f31fae-3d41-45bb-b1f7-df91549ff7a0',
      publishedAt: '0eceedf4-bf45-4702-be3d-201d46286064',
      reviewNotes: '3866a758-bc9b-479a-b163-f576ce779f1e',
    }),
    {
      universalIdentifier: FAQ_ITEMS_ON_HELP_GROUP_FIELD_ID,
      type: FieldType.RELATION,
      name: 'faqItems',
      label: 'Questions',
      icon: 'IconHelp',
      isNullable: true,
      relationTargetObjectMetadataUniversalIdentifier: FAQ_ITEM_OBJECT_ID,
      relationTargetFieldMetadataUniversalIdentifier: HELP_GROUP_ON_FAQ_ITEM_FIELD_ID,
      universalSettings: { relationType: RelationType.ONE_TO_MANY },
    },
  ],
});
