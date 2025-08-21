import type { Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth/lucia';
import { db } from '$lib/server/db/client';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const email = String(form.get('email') || '').toLowerCase().trim();
    const password = String(form.get('password') || '');
    if (!email || !password) return fail(400, { message: 'Missing credentials' });

    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) return fail(400, { message: 'Invalid credentials' });
    // NOTE: Replace with proper password check when implementing real auth
    if (password !== 'demo') return fail(400, { message: 'Invalid credentials' });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    throw redirect(303, '/dashboard');
  }
};

