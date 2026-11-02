import { useEffect } from 'react';
import { CoreApiClient } from 'twenty-client-sdk/core';
import { defineFrontComponent } from 'twenty-sdk/define';
import { enqueueSnackbar, unmountFrontComponent } from 'twenty-sdk/front-component';

// Flags the Network settings record; the request-content-publish logic function calls the worker.
const PublishContentEffect = () => {
  useEffect(() => {
    const request = async () => {
      try {
        const client = new CoreApiClient();
        const result = await client.query({
          networkSettingsRecords: { __args: { first: 1 }, edges: { node: { id: true } } },
        });
        const id = result.networkSettingsRecords?.edges[0]?.node.id;
        if (!id) throw new Error('Create the Network settings record first.');
        await client.mutation({
          updateNetworkSettings: { __args: { id, data: { publishContentRequested: true } }, id: true },
        });
        await enqueueSnackbar({
          message: 'Publishing approved content. Network settings shows the PR and what will change.',
          variant: 'success',
        });
      } catch (error) {
        await enqueueSnackbar({
          message: error instanceof Error ? error.message : 'Publish content failed to start',
          variant: 'error',
        });
      }
      await unmountFrontComponent();
    };

    request();
  }, []);

  return null;
};

export const PUBLISH_CONTENT_FRONT_COMPONENT_ID = '5426ef84-65f3-4fb5-b700-bc02ce377dc7';

export default defineFrontComponent({
  universalIdentifier: PUBLISH_CONTENT_FRONT_COMPONENT_ID,
  name: 'Publish content',
  description: 'Sends approved shared content (products, articles, help, legal) to every partner site',
  isHeadless: true,
  component: PublishContentEffect,
});
