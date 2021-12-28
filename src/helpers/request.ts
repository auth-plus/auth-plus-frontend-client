import { readSessionStorage } from './sessionStorage'

class CustomRequest {
  constructor(private baseUrl: string) {}
  async get<T>(path: string) {
    const resp = await fetch(this.baseUrl + path)
    if (resp.body) {
      const data = await resp.json()
      return data as T
    }
  }
  async post<T>(path: string, payload: Record<string, any>, auth = true) {
    let config = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    }
    if (auth) {
      const token = readSessionStorage<string>('jwt')
      const headers = { ...config.headers, Authorization: `Bearer ${token}` }
      config = { ...config, headers }
    }
    const resp = await fetch(this.baseUrl + path, config)
    const data = await resp.json()
    return data as T
  }
}

export const request = new CustomRequest('http://localhost:5000')
