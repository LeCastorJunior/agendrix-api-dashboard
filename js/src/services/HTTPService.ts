abstract class HTTPService {
  protected abstract baseURI?: string = undefined;

  async get(route: string): Promise<Response> {
    return fetch(this.route(route), this.buildOptions("GET"));
  }

  async post(route: string, params?: object): Promise<Response> {
    return fetch(this.route(route), this.buildOptions("POST", params));
  }

  async put(route: string, params?: object): Promise<Response> {
    return fetch(this.route(route), this.buildOptions("PUT", params));
  }

  async delete(route: string, params?: object): Promise<Response> {
    return fetch(this.route(route), this.buildOptions("DELETE", params));
  }

  private route(route: string): string {
    if (!this.baseURI)
      throw new Error(`Base URI is ${typeof this} must be defined`);

    return `${this.baseURI}${route}`;
  }

  protected abstract buildOptions(method: string, params?: object): object;
}

export default HTTPService;
