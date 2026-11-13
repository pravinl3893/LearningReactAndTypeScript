import apiClient from "./api-client";

interface Entity {
    id: number;
}

class HttpService {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll<T>() {
        const controller = new AbortController();
        const request = apiClient.get<T>(this.endpoint, { signal: controller.signal });
        return { request, cancel: () => controller.abort() };
    }

    create<T>(entity: T) {
        const controller = new AbortController();
        const request = apiClient.post(this.endpoint, entity);
        return { request, cancel: () => controller.abort() };
    }

    update<T extends Entity>(entity: T) {
        const controller = new AbortController();
        const request = apiClient.patch(`${this.endpoint}/${entity.id}`, entity);
        return { request, cancel: () => controller.abort() };
    }

    delete(id: number) {
        const controller = new AbortController();
        const request = apiClient.delete(`${this.endpoint}/${id}`);
        return { request, cancel: () => controller.abort() };
    }
}

const create = (endpoint: string) => {
    return new HttpService(endpoint);
}
export default create;