import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	email: text('email').notNull(),
	name: text('name'),
	age: integer('age')
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const trackingEntry = pgTable('tracking_entry', {
	id: serial('id').primaryKey(),
	userId: text('user_id').notNull().references(() => user.id),
	date: timestamp('day', { withTimezone: true, mode: 'date' }).notNull(),
	score: integer('score').notNull(),
});

export const observation = pgTable('observation', {
	id: serial('id').primaryKey(),
	tracking_entry_id: integer('tracking_entry_id').notNull().references(() => trackingEntry.id),
	text: text('text').notNull(),
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
export type TrackingEntry = typeof trackingEntry.$inferSelect;
export type Observation = typeof observation.$inferSelect;
