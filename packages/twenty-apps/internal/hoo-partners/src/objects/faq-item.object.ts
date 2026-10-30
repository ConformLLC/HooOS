import {
  defineObject,
  FieldType,
  OnDeleteAction,
  RelationType,
} from 'twenty-sdk/define';

import {
  ARTICLE_OBJECT_ID,
  ARTICLE_ON_FAQ_ITEM_FIELD_ID,
  FAQ_ITEM_OBJECT_ID,
  FAQ_ITEM_QUESTION_FIELD_ID,
  FAQ_ITEMS_ON_ARTICLE_FIELD_ID,
  FAQ_ITEMS_ON_HELP_GROUP_FIELD_ID,
  FAQ_ITEMS_ON_TREATMENT_FIELD_ID,
  HELP_GROUP_OBJECT_ID,
  HELP_GROUP_ON_FAQ_ITEM_FIELD_ID,
  TREATMENT_OBJECT_ID,
  TREATMENT_ON_FAQ_ITEM_FIELD_ID,
} from 'src/constants/identifiers';

// Belongs to exactly one of a treatment, an article or a help group.
export default defineObject({
  universalIdentifier: FAQ_ITEM_OBJECT_ID,
  nameSingular: 'faqItem',
  namePlural: 'faqItems',
  labelSingular: 'FAQ item',
  labelPlural: 'FAQ items',
  description: 'One question and answer on a program page, an article or the Help Center.',
  icon: 'IconHelp',
  labelIdentifierFieldMetadataUniversalIdentifier: FAQ_ITEM_QUESTION_FIELD_ID,
  fields: [
    {
      universalIdentifier: FAQ_ITEM_QUESTION_FIELD_ID,
      type: FieldType.TEXT,
      name: 'question',
      label: 'Question',
      icon: 'IconQuestionMark',
    },
    {
      universalIdentifier: '7c3da1b9-d0aa-40fe-b5b7-402b1b8e9cdb',
      type: FieldType.TEXT,
      name: 'answer',
      label: 'Answer',
      icon: 'IconMessage',
    },
    {
      universalIdentifier: TREATMENT_ON_FAQ_ITEM_FIELD_ID,
      type: FieldType.RELATION,
      name: 'treatment',
      label: 'Treatment',
      icon: 'IconFlask',
      isNullable: true,
      relationTargetObjectMetadataUniversalIdentifier: TREATMENT_OBJECT_ID,
      relationTargetFieldMetadataUniversalIdentifier: FAQ_ITEMS_ON_TREATMENT_FIELD_ID,
      universalSettings: {
        relationType: RelationType.MANY_TO_ONE,
        onDelete: OnDeleteAction.CASCADE,
        joinColumnName: 'treatmentId',
      },
    },
    {
      universalIdentifier: ARTICLE_ON_FAQ_ITEM_FIELD_ID,
      type: FieldType.RELATION,
      name: 'article',
      label: 'Article',
      icon: 'IconArticle',
      isNullable: true,
      relationTargetObjectMetadataUniversalIdentifier: ARTICLE_OBJECT_ID,
      relationTargetFieldMetadataUniversalIdentifier: FAQ_ITEMS_ON_ARTICLE_FIELD_ID,
      universalSettings: {
        relationType: RelationType.MANY_TO_ONE,
        onDelete: OnDeleteAction.CASCADE,
        joinColumnName: 'articleId',
      },
    },
    {
      universalIdentifier: HELP_GROUP_ON_FAQ_ITEM_FIELD_ID,
      type: FieldType.RELATION,
      name: 'helpGroup',
      label: 'Help group',
      icon: 'IconLifebuoy',
      isNullable: true,
      relationTargetObjectMetadataUniversalIdentifier: HELP_GROUP_OBJECT_ID,
      relationTargetFieldMetadataUniversalIdentifier: FAQ_ITEMS_ON_HELP_GROUP_FIELD_ID,
      universalSettings: {
        relationType: RelationType.MANY_TO_ONE,
        onDelete: OnDeleteAction.CASCADE,
        joinColumnName: 'helpGroupId',
      },
    },
  ],
});
