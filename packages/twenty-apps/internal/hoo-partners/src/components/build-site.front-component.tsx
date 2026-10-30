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
const BuildSiteEffect = () => {
  const recordId = useRecordId();

  useEffect(() => {
    const request = async () => {
      try {
        if (recordId) {
          await new CoreApiClient().mutation({
            updatePartner: {
              __args: { id: recordId, data: { rxRequestedStep: 'SITE' } },
              id: true,
            },
          });
          await enqueueSnackbar({
            message: 'Build site started. Status and preview link update on this record.',
            variant: 'success',
          });
        }
      } catch (error) {
        await enqueueSnackbar({
          message: error instanceof Error ? error.message : 'Build site failed to start',
          variant: 'error',
        });
      }
      await unmountFrontComponent();
    };

    request();
  }, [recordId]);

  return null;
};

export const BUILD_SITE_FRONT_COMPONENT_ID = '7823d4e4-9acb-428f-bb64-dbdee06304df';

export default defineFrontComponent({
  universalIdentifier: BUILD_SITE_FRONT_COMPONENT_ID,
  name: 'Build site',
  description: 'Asks the hoo-rx worker to run build site for this partner',
  isHeadless: true,
  component: BuildSiteEffect,
});
