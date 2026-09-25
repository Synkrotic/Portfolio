class Api {
    private _url: string;

    constructor(url: string) {
        this._url = url;
    }

    get url(): string {
        return this._url;
    }


    async getProgramVersions(program: string): Promise<string[]> {
        const res = await fetch(`${this._url}/api/listversions/${program}`);

        if (!res.ok) {
            throw new Error(`HTTP error ${res.status}`)
        }

        const files: string[] = await res.json()
        return files;
    }
}

const api = new Api("http://localhost:3001");
export default api