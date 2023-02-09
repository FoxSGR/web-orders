import { CliRegister } from '../../cli/cli.register';

export function Cli(name: string) {
  return target => CliRegister.register(name, target);
}
