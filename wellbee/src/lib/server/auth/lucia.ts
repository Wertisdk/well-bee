import { Lucia } from 'lucia';
import { betterSqlite3Adapter } from '@lucia-auth/adapter-drizzle';
import type { DB } from '../db/client';
import { db } from '../db/client';
import { users, sessions } from '../db/schema';

export const lucia = new Lucia(
  betterSqlite3Adapter(db, sessions, users),
  {
    sessionCookie: {
      attributes: {
        secure: false
      }
    },
    getUserAttributes: (attributes) => ({
      email: attributes.email,
      name: attributes.name
    })
  }
);

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
      name: string | null;
    };
  }
}

