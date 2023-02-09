export class CliRegister {
  private static services = {};

  static register(key: string, clazz: any) {
    this.services[key] = clazz;
  }

  static get(key: string) {
    return this.services[key];
  }
}
