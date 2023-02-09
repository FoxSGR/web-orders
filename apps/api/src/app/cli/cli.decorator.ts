import { CliRegister } from './cli.register';

export function Cli(name: string) {
  return target => CliRegister.register(name, target);
}
