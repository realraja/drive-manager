// ✅ Save to localStorage
export function SaveLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// ✅ Get from localStorage
export function GetLocalStorage<T>(key: string): T | null {
  const storedValue = localStorage.getItem(key);
  return storedValue ? (JSON.parse(storedValue) as T) : null;
}


export const PCURL = 'PCURL';