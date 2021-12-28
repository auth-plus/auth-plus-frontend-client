class CustomRequest {
  constructor(private baseUrl: string) {}
  async get(path: string) {
    const resp = await fetch(this.baseUrl + path)
  }
}

export const request = new CustomRequest('')
