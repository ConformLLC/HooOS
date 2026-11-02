import { CoreApiClient } from 'twenty-client-sdk/core';
import {
  defineLogicFunction,
  type DatabaseEventPayload,
  type ObjectRecordUpdateEvent,
} from 'twenty-sdk/define';

type PartnerRecord = { id: string; rxRequestedStep: 'BRAND' | 'SITE' | 'PUBLISH' | null };

const STEPS = { BRAND: 'brand', SITE: 'site', PUBLISH: 'publish' } as const;

const handler = async (
  payload: DatabaseEventPayload<ObjectRecordUpdateEvent<PartnerRecord>>,
) => {
  const { id, rxRequestedStep } = payload.properties.after;
  if (!rxRequestedStep) return { skipped: true };

  const client = new CoreApiClient();
  const update = (data: Record<string, unknown>) =>
    client.mutation({ updatePartner: { __args: { id, data }, id: true } });

  let error: string | undefined;
  try {
    const response = await fetch(`${process.env.WORKER_URL?.replace(/\/$/, '')}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.WORKER_TOKEN
          ? { Authorization: `Bearer ${process.env.WORKER_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({ partnerId: id, step: STEPS[rxRequestedStep] }),
    });
    // 409 (Preview the brand first) and 400 are already written to the record by the worker.
    if (!response.ok && response.status !== 409 && response.status !== 400)
      error = `Worker returned ${response.status}: ${(await response.text()).slice(0, 300)}`;
  } catch (caught) {
    error = `Worker unreachable at ${process.env.WORKER_URL}: ${caught instanceof Error ? caught.message : String(caught)}`;
  }

  await update(error ? { rxRequestedStep: null, rxBuildStatus: 'FAILED', lastError: error } : { rxRequestedStep: null });
  return { step: rxRequestedStep, error };
};

export default defineLogicFunction({
  universalIdentifier: '3ef61749-8904-4a0a-9913-01189d0b5b30',
  name: 'request-rx-step',
  description: 'Sends Preview brand and Build site requests from a Partner to the hoo-rx worker',
  timeoutSeconds: 30,
  handler,
  databaseEventTriggerSettings: {
    eventName: 'partner.updated',
    updatedFields: ['rxRequestedStep'],
  },
});
