import {
  defineObject,
  FieldType,
  OnDeleteAction,
  RelationType,
} from 'twenty-sdk/define';

import {
  ARTICLE_OBJECT_ID,
  ARTICLE_ON_CITATION_FIELD_ID,
  CITATION_OBJECT_ID,
  CITATION_TITLE_FIELD_ID,
  CITATIONS_ON_ARTICLE_FIELD_ID,
  CITATIONS_ON_TREATMENT_FIELD_ID,
  TREATMENT_OBJECT_ID,
  TREATMENT_ON_CITATION_FIELD_ID,
} from 'src/constants/identifiers';

// A primary source listed at the end of a program page or article. The export
// rejects hosts outside hoo-rx's SOURCE_HOSTS (FDA, NIH, CDC, AHRQ and listed
// medical societies).
export default defineObject({
  universalIdentifier: CITATION_OBJECT_ID,
  nameSingular: 'citation',
  namePlural: 'citations',
  labelSingular: 'Source',
  labelPlural: 'Sources',
  description: 'A primary source: FDA, NIH (PubMed, MedlinePlus), CDC, AHRQ or a medical society.',
  icon: 'IconBook',
  labelIdentifierFieldMetadataUniversalIdentifier: CITATION_TITLE_FIELD_ID,
  fields: [
    {
      universalIdentifier: CITATION_TITLE_FIELD_ID,
      type: FieldType.TEXT,
      name: 'title',
      label: 'Title',
      icon: 'IconAbc',
    },
    {
      universalIdentifier: '08f30be0-1a9d-42e8-bbd6-f29b791edf0e',
      type: FieldType.TEXT,
      name: 'publisher',
      label: 'Publisher',
      description: 'e.g. "U.S. Food and Drug Administration".',
      icon: 'IconBuilding',
    },
    {
      universalIdentifier: '2038918f-20b4-4282-8882-d4cfa2f03cac',
      type: FieldType.LINKS,
      name: 'url',
      label: 'URL',
      icon: 'IconLink',
    },
    {
      universalIdentifier: TREATMENT_ON_CITATION_FIELD_ID,
      type: FieldType.RELATION,
      name: 'treatment',
      label: 'Treatment',
      icon: 'IconFlask',
      isNullable: true,
      relationTargetObjectMetadataUniversalIdentifier: TREATMENT_OBJECT_ID,
      relationTargetFieldMetadataUniversalIdentifier: CITATIONS_ON_TREATMENT_FIELD_ID,
      universalSettings: {
        relationType: RelationType.MANY_TO_ONE,
        onDelete: OnDeleteAction.CASCADE,
        joinColumnName: 'treatmentId',
      },
    },
    {
      universalIdentifier: ARTICLE_ON_CITATION_FIELD_ID,
      type: FieldType.RELATION,
      name: 'article',
      label: 'Article',
      icon: 'IconArticle',
      isNullable: true,
      relationTargetObjectMetadataUniversalIdentifier: ARTICLE_OBJECT_ID,
      relationTargetFieldMetadataUniversalIdentifier: CITATIONS_ON_ARTICLE_FIELD_ID,
      universalSettings: {
        relationType: RelationType.MANY_TO_ONE,
        onDelete: OnDeleteAction.CASCADE,
        joinColumnName: 'articleId',
      },
    },
  ],
});
