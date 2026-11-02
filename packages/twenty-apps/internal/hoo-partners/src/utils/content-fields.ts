import { FieldType } from 'twenty-sdk/define';

import {
  CONTENT_STATUS_APPROVED,
  CONTENT_STATUS_ARCHIVED,
  CONTENT_STATUS_DRAFT,
  CONTENT_STATUS_IN_REVIEW,
  CONTENT_STATUS_PUBLISHED,
} from 'src/constants/identifiers';

type ContentStatusIds = {
  status: string;
  // Option ids in order: draft, in review, approved, published, archived.
  options: readonly [string, string, string, string, string];
  approvedAt: string;
  publishedAt: string;
  reviewNotes: string;
};

export const contentStatusFields = (ids: ContentStatusIds) => [
  {
    universalIdentifier: ids.status,
    type: FieldType.SELECT as const,
    name: 'status',
    label: 'Status',
    description: 'Only Approved and Published content reaches partner sites. Chethan approves.',
    icon: 'IconProgressCheck',
    defaultValue: `'${CONTENT_STATUS_DRAFT}'`,
    options: [
      { id: ids.options[0], value: CONTENT_STATUS_DRAFT, label: 'Draft', color: 'gray' as const, position: 0 },
      { id: ids.options[1], value: CONTENT_STATUS_IN_REVIEW, label: 'In review', color: 'orange' as const, position: 1 },
      { id: ids.options[2], value: CONTENT_STATUS_APPROVED, label: 'Approved', color: 'purple' as const, position: 2 },
      { id: ids.options[3], value: CONTENT_STATUS_PUBLISHED, label: 'Published', color: 'green' as const, position: 3 },
      { id: ids.options[4], value: CONTENT_STATUS_ARCHIVED, label: 'Archived', color: 'red' as const, position: 4 },
    ],
  },
  {
    universalIdentifier: ids.approvedAt,
    type: FieldType.DATE_TIME as const,
    name: 'approvedAt',
    label: 'Approved at',
    description: 'Shown on the page as the updated date.',
    icon: 'IconCalendarCheck',
    isNullable: true as const,
  },
  {
    universalIdentifier: ids.publishedAt,
    type: FieldType.DATE_TIME as const,
    name: 'publishedAt',
    label: 'Published at',
    description: 'Set when the PR carrying this version merges.',
    icon: 'IconWorldUpload',
    isNullable: true as const,
  },
  {
    universalIdentifier: ids.reviewNotes,
    type: FieldType.TEXT as const,
    name: 'reviewNotes',
    label: 'Review notes',
    description: 'Copy check findings and Chethan’s comments.',
    icon: 'IconMessage',
    isNullable: true as const,
  },
];

export const slugField = (universalIdentifier: string, description: string) => ({
  universalIdentifier,
  type: FieldType.TEXT as const,
  name: 'slug',
  label: 'Slug',
  description,
  icon: 'IconLink',
  isUnique: true as const,
});

export const seoFields = (titleId: string, descriptionId: string) => [
  {
    universalIdentifier: titleId,
    type: FieldType.TEXT as const,
    name: 'seoTitle',
    label: 'Page title',
    description: 'Under 60 characters. May use {brand}.',
    icon: 'IconHeading',
  },
  {
    universalIdentifier: descriptionId,
    type: FieldType.TEXT as const,
    name: 'seoDescription',
    label: 'Page description',
    description: 'Under 160 characters. May use {brand}.',
    icon: 'IconAlignLeft',
  },
];

export const answerField = (universalIdentifier: string) => ({
  universalIdentifier,
  type: FieldType.TEXT as const,
  name: 'answer',
  label: 'Answer first',
  description: 'Two sentences at most, shown at the top of the page.',
  icon: 'IconBulb',
});
