import { useEffect } from 'react';
import { CoreApiClient } from 'twenty-client-sdk/core';
import { defineFrontComponent } from 'twenty-sdk/define';
import {
  enqueueSnackbar,
  unmountFrontComponent,
  useRecordId,
} from 'twenty-sdk/front-component';

// Only records the request; the request-rx-step logic function calls the worker,
// so the worker token never reaches the browser.
const PreviewBrandEffect = () => {
  const recordId = useRecordId();

  useEffect(() => {
    const request = async () => {
      try {
        if (recordId) {
          await new CoreApiClient().mutation({
            updatePartner: {
              __args: { id: recordId, data: { rxRequestedStep: 'BRAND' } },
              id: true,
            },
          });
          await enqueueSnackbar({
            message: 'Preview brand started. Status and preview link update on this record.',
            variant: 'success',
          });
        }
      } catch (error) {
        await enqueueSnackbar({
          message: error instanceof Error ? error.message : 'Preview brand failed to start',
          variant: 'error',
        });
      }
      await unmountFrontComponent();
    };

    request();
  }, [recordId]);

  return null;
};

export const PREVIEW_BRAND_FRONT_COMPONENT_ID = '638350d2-1d7a-4e52-89a0-7f5fe9a46145';

export default defineFrontComponent({
  universalIdentifier: PREVIEW_BRAND_FRONT_COMPONENT_ID,
  name: 'Preview brand',
  description: 'Asks the hoo-rx worker to run preview brand for this partner',
  isHeadless: true,
  component: PreviewBrandEffect,
});
