import { defineObject, FieldType } from 'twenty-sdk/define';

import {
  NETWORK_SETTINGS_NAME_FIELD_ID,
  NETWORK_SETTINGS_OBJECT_ID,
} from 'src/constants/identifiers';

// One record: the facts every partner site shares. Patients contact central support, never the partner,
// so medical and order questions reach people who can answer them.
export default defineObject({
  universalIdentifier: NETWORK_SETTINGS_OBJECT_ID,
  nameSingular: 'networkSettings',
  namePlural: 'networkSettingsRecords',
  labelSingular: 'Network settings',
  labelPlural: 'Network settings',
  description: 'Shared by every partner site: who the legal seller is and where patients get support. Keep exactly one record.',
  icon: 'IconSettings',
  labelIdentifierFieldMetadataUniversalIdentifier: NETWORK_SETTINGS_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: NETWORK_SETTINGS_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'name',
      label: 'Name',
      icon: 'IconAbc',
    },
    {
      universalIdentifier: '9f4a1b28-ed70-4aff-9d1d-3b018984b322',
      type: FieldType.TEXT,
      name: 'legalSellerName',
      label: 'Legal seller',
      description:
        'The company patients buy from, named in the footer, Terms and Privacy on every site. A partner’s Legal name override replaces it for that partner. Sites cannot be built until this is set.',
      icon: 'IconLicense',
      isNullable: true,
    },
    {
      universalIdentifier: 'cd4e97cf-4787-4549-8615-a54e8861a477',
      type: FieldType.EMAILS,
      name: 'supportEmail',
      label: 'Support email',
      description: 'Shown on every partner site for order and medication questions.',
      icon: 'IconMail',
      isNullable: true,
    },
    {
      universalIdentifier: '434512d8-f075-47a7-96fd-c4b355b5d57c',
      type: FieldType.PHONES,
      name: 'supportPhone',
      label: 'Support phone',
      description: 'Shown on every partner site. Optional.',
      icon: 'IconPhone',
      isNullable: true,
    },
    {
      universalIdentifier: 'e9379688-9c01-4d8b-8dad-b22933925e35',
      type: FieldType.BOOLEAN,
      name: 'publishContentRequested',
      label: 'Publish content requested',
      description: 'Set by the Publish content button; the worker call clears it.',
      icon: 'IconPlayerPlay',
      defaultValue: false,
    },
    {
      universalIdentifier: '481e0b1c-1884-40bf-b18b-cb7180988d6b',
      type: FieldType.TEXT,
      name: 'contentPublishPr',
      label: 'Content PR',
      description: 'The open PR carrying approved content to every site. It merges itself when the checks pass.',
      icon: 'IconGitPullRequest',
      isNullable: true,
    },
    {
      universalIdentifier: '9f7dbb9d-a4de-4dd3-83c4-8d90b3613b1b',
      type: FieldType.TEXT,
      name: 'contentPending',
      label: 'Content waiting to go live',
      icon: 'IconListCheck',
      isNullable: true,
    },
    {
      universalIdentifier: '7a750211-df80-48f1-8042-6ddef4cd899d',
      type: FieldType.TEXT,
      name: 'contentLastError',
      label: 'Content publish error',
      icon: 'IconAlertCircle',
      isNullable: true,
    },
    {
      universalIdentifier: '86e7cec9-e87c-4666-a6b7-75b9d95b489f',
      type: FieldType.RAW_JSON,
      name: 'homeTemplate',
      label: 'Home page template',
      description:
        'The home page every partner site shares, saved by the site designer. Publish content sends it to the sites.',
      icon: 'IconLayout',
      isNullable: true,
    },
  ],
});
