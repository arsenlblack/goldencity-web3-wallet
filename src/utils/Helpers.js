import { useState, useEffect } from "react";

/**
 * usePersistedState
 * 
 * Simplified version of user-specific persisted state.
 * Persists any value in localStorage under a given key.
 *
 * @param {string} key - storage key
 * @param {any} defaultValue - fallback value
 */
export function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      /* gracefully ignore */
    }
  }, [key, state]);

  return [state, setState];
}
