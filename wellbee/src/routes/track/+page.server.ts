import type { Actions } from './$types';
import { db } from '$lib/server/db/client';
import { dayEntries } from '$lib/server/db/schema';

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const date = String(form.get('date'));
    const rating = Number(form.get('rating'));
    const symptomsJson = String(form.get('symptomsJson') || '[]');
    const journal = String(form.get('journal') || '');
    await db.insert(dayEntries).values({
      id: crypto.randomUUID(),
      userId: 'demo-user',
      date,
      rating,
      symptomsJson,
      journal
    });
    return { success: true };
  }
};

