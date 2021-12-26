export function writeSessionStorage<T>(content: T | null, key: string) {
  if (content === null) {
    sessionStorage.removeItem(key)
  } else {
    const contentJSON = JSON.stringify(content)
    sessionStorage.setItem(key, contentJSON)
  }
}

export function readSessionStorage<T>(key: string): T | null {
  const contentJSON = sessionStorage.getItem(key)
  if (contentJSON === null) {
    return null
  }
  return JSON.parse(contentJSON) as T
}
