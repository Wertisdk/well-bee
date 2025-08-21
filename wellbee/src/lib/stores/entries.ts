import { writable } from 'svelte/store';

export type SymptomSelection = { id: string; severity?: number };
export type DayEntry = {
  id: string;
  date: string;
  rating: number;
  symptoms: SymptomSelection[];
  journal: string;
};

const STORAGE_KEY = 'wellbee.entries.v1';

function createEntriesStore() {
  const initial: DayEntry[] = load();
  const { subscribe, set, update } = writable<DayEntry[]>(initial);

  function load(): DayEntry[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as DayEntry[]) : [];
    } catch {
      return [];
    }
  }

  function persist(entries: DayEntry[]) {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }

  return {
    subscribe,
    add(entry: Omit<DayEntry, 'id'>) {
      const newEntry: DayEntry = { id: crypto.randomUUID(), ...entry };
      update((list) => {
        const next = [newEntry, ...list].sort((a, b) => b.date.localeCompare(a.date));
        persist(next);
        return next;
      });
    },
    remove(id: string) {
      update((list) => {
        const next = list.filter((e) => e.id !== id);
        persist(next);
        return next;
      });
    },
    setAll(entries: DayEntry[]) {
      set(entries);
      persist(entries);
    }
  };
}

export const entries = createEntriesStore();

