import { CoreApiClient } from 'twenty-client-sdk/core';
import {
  defineLogicFunction,
  type DatabaseEventPayload,
  type ObjectRecordUpdateEvent,
} from 'twenty-sdk/define';

type NetworkSettingsRecord = { id: string; publishContentRequested: boolean | null };

const handler = async (
  payload: DatabaseEventPayload<ObjectRecordUpdateEvent<NetworkSettingsRecord>>,
) => {
  const { id, publishContentRequested } = payload.properties.after;
  if (!publishContentRequested) return { skipped: true };

  let error: string | undefined;
  try {
    const response = await fetch(`${process.env.WORKER_URL?.replace(/\/$/, '')}/publish-content`, {
      method: 'POST',
      headers: process.env.WORKER_TOKEN ? { Authorization: `Bearer ${process.env.WORKER_TOKEN}` } : {},
    });
    if (!response.ok) error = `Worker returned ${response.status}: ${(await response.text()).slice(0, 300)}`;
  } catch (caught) {
    error = `Worker unreachable at ${process.env.WORKER_URL}: ${caught instanceof Error ? caught.message : String(caught)}`;
  }

  await new CoreApiClient().mutation({
    updateNetworkSettings: {
      __args: {
        id,
        data: error ? { publishContentRequested: false, contentLastError: error } : { publishContentRequested: false },
      },
      id: true,
    },
  });
  return { error };
};

export default defineLogicFunction({
  universalIdentifier: '5af656f1-3201-4b46-bd99-a24927efa111',
  name: 'request-content-publish',
  description: 'Sends Publish content requests to the hoo-rx worker',
  timeoutSeconds: 30,
  handler,
  databaseEventTriggerSettings: {
    eventName: 'networkSettings.updated',
    updatedFields: ['publishContentRequested'],
  },
});
