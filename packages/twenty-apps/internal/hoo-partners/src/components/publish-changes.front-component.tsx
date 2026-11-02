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
const PublishChangesEffect = () => {
  const recordId = useRecordId();

  useEffect(() => {
    const request = async () => {
      try {
        if (recordId) {
          await new CoreApiClient().mutation({
            updatePartner: {
              __args: { id: recordId, data: { rxRequestedStep: 'PUBLISH' } },
              id: true,
            },
          });
          await enqueueSnackbar({
            message: 'Publishing started. When the checks pass, Waiting to go live lists the changes and the site updates by itself.',
            variant: 'success',
          });
        }
      } catch (error) {
        await enqueueSnackbar({
          message: error instanceof Error ? error.message : 'Publish failed to start',
          variant: 'error',
        });
      }
      await unmountFrontComponent();
    };

    request();
  }, [recordId]);

  return null;
};

export const PUBLISH_CHANGES_FRONT_COMPONENT_ID = 'f9013b0a-10dd-4ab9-8d97-56c14280f105';

export default defineFrontComponent({
  universalIdentifier: PUBLISH_CHANGES_FRONT_COMPONENT_ID,
  name: 'Publish changes',
  description: 'Asks the hoo-rx worker to rebuild this partner’s site from Twenty and open its publish PR',
  isHeadless: true,
  component: PublishChangesEffect,
});
