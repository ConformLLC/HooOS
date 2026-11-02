import { definePageLayout, PageLayoutTabLayoutMode } from 'twenty-sdk/define';

import {
  CITATIONS_ON_TREATMENT_FIELD_ID,
  FAQ_ITEMS_ON_TREATMENT_FIELD_ID,
  PARTNER_TREATMENTS_ON_TREATMENT_FIELD_ID,
  TREATMENT_DESCRIPTION_FIELD_ID,
  TREATMENT_OBJECT_ID,
} from 'src/constants/identifiers';
import { PRODUCT_RECORD_FIELDS_VIEW_ID } from 'src/views/product-record-fields.view';

// One shared product: its details, the Description every partner site shows, then its FAQ and sources.
export default definePageLayout({
  universalIdentifier: 'd6f8dca2-6534-4f4e-bb52-83579444489e',
  name: 'Product',
  type: 'RECORD_PAGE',
  objectUniversalIdentifier: TREATMENT_OBJECT_ID,
  tabs: [
    {
      universalIdentifier: 'ff767b94-ef34-4987-9580-0e276645b9f7',
      title: 'Product',
      position: 0,
      icon: 'IconFlask',
      layoutMode: PageLayoutTabLayoutMode.VERTICAL_LIST,
      widgets: [
        {
          universalIdentifier: '612d5084-f9ef-426f-bedf-d633d7715b60',
          title: 'Details',
          type: 'FIELDS',
          configuration: { configurationType: 'FIELDS', viewUniversalIdentifier: PRODUCT_RECORD_FIELDS_VIEW_ID },
        },
        {
          universalIdentifier: '3d41ceee-3626-4b91-9ef1-afb81ea45289',
          title: 'Description',
          type: 'FIELD',
          configuration: {
            configurationType: 'FIELD',
            fieldMetadataId: TREATMENT_DESCRIPTION_FIELD_ID,
            fieldDisplayMode: 'EDITOR',
          },
        },
        {
          universalIdentifier: '87e15644-3abf-46e1-a3c5-e2dc3486654a',
          title: 'FAQ',
          type: 'FIELD',
          configuration: {
            configurationType: 'FIELD',
            fieldMetadataId: FAQ_ITEMS_ON_TREATMENT_FIELD_ID,
            fieldDisplayMode: 'TABLE',
          },
        },
        {
          universalIdentifier: '9f2e2aa9-4d3b-4b36-8310-9793eada972a',
          title: 'Sources',
          type: 'FIELD',
          configuration: {
            configurationType: 'FIELD',
            fieldMetadataId: CITATIONS_ON_TREATMENT_FIELD_ID,
            fieldDisplayMode: 'TABLE',
          },
        },
      ],
    },
    {
      universalIdentifier: 'ad93f770-8ae3-4fb7-971c-82cf4ae089c5',
      title: 'Partners',
      position: 1,
      icon: 'IconBuildingStore',
      layoutMode: PageLayoutTabLayoutMode.VERTICAL_LIST,
      widgets: [
        {
          universalIdentifier: 'c2004dbd-d754-4f5d-97d1-44a76764054a',
          title: 'Partners selling this product',
          type: 'FIELD',
          configuration: {
            configurationType: 'FIELD',
            fieldMetadataId: PARTNER_TREATMENTS_ON_TREATMENT_FIELD_ID,
            fieldDisplayMode: 'TABLE',
          },
        },
      ],
    },
  ],
});
