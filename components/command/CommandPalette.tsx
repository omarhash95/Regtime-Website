'use client';

import { useState, useEffect, useRef, useMemo, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command as CommandIcon, Loader2 } from 'lucide-react';
import Fuse from 'fuse.js';
import { useCommands, type Command } from './useCommands';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { transitions, dur, ease } from '@/lib/motion';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const { shouldReduceMotion } = useReducedMotion();
  const commands = useCommands(); // safe if hook ignores isLoading
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
    } else {
      setQuery('');
      setActiveIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    try {
      const data = localStorage.getItem('ui:recentCommands');
      if (data) setRecent(JSON.parse(data));
    } catch {}
  }, []);

  const saveRecent = (id: string) => {
    try {
      const next = [id, ...recent.filter(x => x !== id)].slice(0, 7);
      setRecent(next);
      localStorage.setItem('ui:recentCommands', JSON.stringify(next));
    } catch {}
  };

  const fuse = useMemo(() => new Fuse(commands, {
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'description', weight: 0.3 },
      { name: 'keywords', weight: 0.5 }
    ],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 1
  }), [commands]);

  const filtered: Command[] = useMemo(() => {
    if (!query.trim()) {
      const byId = new Map(commands.map(c => [c.id, c]));
      const recentItems = recent.map(id => byId.get(id)).filter(Boolean) as Command[];
      const rest = commands.filter(c => !recent.includes(c.id)).slice(0, 12);
      return [...recentItems, ...rest];
    }
    const results = fuse.search(query).sort((a, b) => (a.score ?? 0) - (b.score ?? 0));
    return results.map(r => r.item);
  }, [query, fuse, commands, recent]);

  useEffect(() => { setActiveIndex(0); }, [query]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, Math.max(0, filtered.length - 1)));
      scrollIntoView(activeIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
      scrollIntoView(activeIndex - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = filtered[activeIndex];
      if (item) {
        item.handler();
        saveRecent(item.id);
        onClose();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const scrollIntoView = (index: number) => {
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelectorAll('[role="option"]')[index] as HTMLElement | undefined;
    if (!el) return;
    const listRect = list.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    if (elRect.top < listRect.top) {
      list.scrollTop -= (listRect.top - elRect.top);
    } else if (elRect.bottom > listRect.bottom) {
      list.scrollTop += (elRect.bottom - listRect.bottom);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]" aria-hidden={!isOpen}>
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : dur.sm, ease: ease.out }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
            className="pointer-events-auto mx-auto mt-[10vh] w-full max-w-2xl rounded-2xl shadow-lg border border-black/10 bg-white dark:bg-zinc-900 dark:border-white/10"
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
            transition={{ duration: shouldReduceMotion ? 0 : dur.sm, ease: ease.out }}
          >
            <div className="px-4 py-3 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-[color:var(--brand-night,#111111)]/70 dark:text-white/70" aria-hidden="true" />
                <input
                  ref={inputRef}
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="cmdk-listbox"
                  aria-activedescendant={filtered[activeIndex]?.id ?? undefined}
                  placeholder="Search commands…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  className="placeholder:text-zinc-500 w-full bg-transparent outline-none text-[15px] leading-6 text-[color:var(--brand-night,#111111)] dark:text-white"
                />
                <div className="hidden sm:flex items-center gap-1 text-xs text-zinc-500">
                  <Kbd>↑</Kbd><Kbd>↓</Kbd><span className="mx-1">to navigate</span><Kbd>↵</Kbd><span>to select</span>
                </div>
              </div>
              {query && (
                <div className="mt-2 text-xs text-zinc-500">
                  Showing {filtered.length} result{filtered.length === 1 ? '' : 's'} for "{query}"
                </div>
              )}
            </div>

            <div ref={listRef} id="cmdk-listbox" role="listbox" aria-label="Command results" className="max-h-[60vh] overflow-auto p-1">
              {filtered.length === 0 ? (
                <div className="p-6 text-center text-sm text-zinc-500">
                  No commands found. Try different keywords.
                </div>
              ) : (
                filtered.map((cmd, i) => (
                  <button
                    key={cmd.id}
                    id={cmd.id}
                    role="option"
                    aria-selected={i === activeIndex}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => { cmd.handler(); saveRecent(cmd.id); onClose(); }}
                    className={[
                      'group w-full text-left rounded-xl px-3 py-2.5 my-1',
                      i === activeIndex
                        ? 'bg-[color:var(--brand-alice,#DEEDF4)] ring-1 ring-[color:var(--brand-baby,#78C7EA)]'
                        : 'hover:bg-zinc-100/70 dark:hover:bg-white/5'
                    ].join(' ')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 h-8 w-8 rounded-lg border border-black/10 dark:border-white/10 grid place-items-center">
                        <span aria-hidden="true" className="text-base">{cmd.icon ?? '⌘'}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="truncate font-medium text-[color:var(--brand-night,#111111)] dark:text-white">
                            {cmd.title}
                          </span>
                          {cmd.shortcut && (
                            <span className="ml-auto hidden sm:flex gap-1">
                              {cmd.shortcut.split(' ').map((k, idx) => <Kbd key={idx}>{k.toUpperCase()}</Kbd>)}
                            </span>
                          )}
                        </div>
                        {cmd.description && <p className="mt-0.5 text-xs text-zinc-500 line-clamp-2">{cmd.description}</p>}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t border-black/[0.06] dark:border-white/[0.08] text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1"><Kbd>Esc</Kbd>Close</span>
                <span className="inline-flex items-center gap-1"><Kbd>↵</Kbd>Select</span>
              </div>
              <span className="flex items-center"><CommandIcon className="h-3 w-3 mr-1" />Command Palette</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="px-1.5 py-0.5 rounded-md border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-[inset_0_-1px_0_rgba(0,0,0,0.04)] text-[11px] leading-none">
      {children}
    </kbd>
  );
}