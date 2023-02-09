import { CliRegister } from '../../cli/cli.register';

export const Cli = (name: string) => target =>
  CliRegister.register(name, target);
