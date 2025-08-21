import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(Math.floor(Date.now() / 1000))
});

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  expiresAt: integer('expires_at').notNull()
});

export const dayEntries = sqliteTable('day_entries', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  date: text('date').notNull(),
  rating: integer('rating').notNull(),
  symptomsJson: text('symptoms_json').notNull(),
  journal: text('journal')
});

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  entries: many(dayEntries)
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] })
}));

export const entriesRelations = relations(dayEntries, ({ one }) => ({
  user: one(users, { fields: [dayEntries.userId], references: [users.id] })
}));

export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type DayEntry = typeof dayEntries.$inferSelect;

