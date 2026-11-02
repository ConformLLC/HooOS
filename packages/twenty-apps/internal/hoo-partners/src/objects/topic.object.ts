import { defineObject, FieldType, RelationType } from 'twenty-sdk/define';

import {
  ARTICLE_OBJECT_ID,
  ARTICLES_ON_TOPIC_FIELD_ID,
  CONTENT_OPT_OUT_OBJECT_ID,
  CONTENT_OPT_OUTS_ON_TOPIC_FIELD_ID,
  TOPIC_LABEL_FIELD_ID,
  TOPIC_OBJECT_ID,
  TOPIC_ON_ARTICLE_FIELD_ID,
  TOPIC_ON_CONTENT_OPT_OUT_FIELD_ID,
} from 'src/constants/identifiers';
import { contentStatusFields, slugField } from 'src/utils/content-fields';

export default defineObject({
  universalIdentifier: TOPIC_OBJECT_ID,
  nameSingular: 'topic',
  namePlural: 'topics',
  labelSingular: 'Topic',
  labelPlural: 'Topics',
  description: 'A Health Guide topic. Partners can opt out of a whole topic.',
  icon: 'IconTags',
  labelIdentifierFieldMetadataUniversalIdentifier: TOPIC_LABEL_FIELD_ID,
  fields: [
    {
      universalIdentifier: TOPIC_LABEL_FIELD_ID,
      type: FieldType.TEXT,
      name: 'label',
      label: 'Label',
      icon: 'IconAbc',
    },
    slugField('c21a8721-4959-451b-bdc4-d91a8573f39f', 'Page path under /health-guide/topics/.'),
    {
      universalIdentifier: '0b5837f4-98b4-4944-8530-8bf17bec29f9',
      type: FieldType.TEXT,
      name: 'description',
      label: 'Description',
      description: 'Under 160 characters.',
      icon: 'IconAlignLeft',
    },
    ...contentStatusFields({
      status: 'e109fbb0-601a-43f5-a846-1ece3dcdd227',
      options: ['b27502b3-201a-4dcf-b5d6-419199a59ca3', '93bd2e30-dbe1-488e-8dc1-390155ac3222', 'a0a3c2e2-461e-4960-8dc7-6d7fed548970', '6d074a76-5981-43bf-84be-0f3f1afb6ea4', '336fab87-893a-413b-8944-af19cf5ef5d4'],
      approvedAt: '609d4f5e-2aa7-4688-87b1-3f949c2bcb42',
      publishedAt: 'b956b52c-6e61-40a5-9b86-5af56dafb539',
      reviewNotes: '1f73dca4-97a0-4c75-b93e-561c46025178',
    }),
    {
      universalIdentifier: ARTICLES_ON_TOPIC_FIELD_ID,
      type: FieldType.RELATION,
      name: 'articles',
      label: 'Articles',
      icon: 'IconArticle',
      isNullable: true,
      relationTargetObjectMetadataUniversalIdentifier: ARTICLE_OBJECT_ID,
      relationTargetFieldMetadataUniversalIdentifier: TOPIC_ON_ARTICLE_FIELD_ID,
      universalSettings: { relationType: RelationType.ONE_TO_MANY },
    },
    {
      universalIdentifier: CONTENT_OPT_OUTS_ON_TOPIC_FIELD_ID,
      type: FieldType.RELATION,
      name: 'optOuts',
      label: 'Partners opted out',
      icon: 'IconEyeOff',
      isNullable: true,
      relationTargetObjectMetadataUniversalIdentifier: CONTENT_OPT_OUT_OBJECT_ID,
      relationTargetFieldMetadataUniversalIdentifier: TOPIC_ON_CONTENT_OPT_OUT_FIELD_ID,
      universalSettings: { relationType: RelationType.ONE_TO_MANY },
    },
  ],
});
