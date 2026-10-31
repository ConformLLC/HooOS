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
  ],
});
