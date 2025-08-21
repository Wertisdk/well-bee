import type { Actions } from './$types';
import { db } from '$lib/server/db/client';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

// TODO: wire to real auth session; for now use a single demo user
const DEMO_USER_ID = 'demo-user';

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const name = String(form.get('name') || '') || null;
    const childName = String(form.get('childName') || '') || null;
    const timezone = String(form.get('timezone') || '') || null;

    await db.insert(users).values({ id: DEMO_USER_ID, email: 'demo@wellbee.local', name }).onConflictDoUpdate({
      target: users.id,
      set: { name }
    });

    return { success: true };
  }
};

