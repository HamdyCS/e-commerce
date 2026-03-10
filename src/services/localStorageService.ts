export function getItemFromLocalStorage<T>(key: string) {
  const data = localStorage.getItem(key);

  if (!data) return null;
  try {
    return JSON.parse(data) as T;
  } catch (error) {
    return null;
  }
}

export function setItemToLocalStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function removeItemFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}
