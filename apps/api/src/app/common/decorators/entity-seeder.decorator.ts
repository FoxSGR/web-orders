export const entitySeeders: { new (): any }[] = [];

export const EntitySeederService = () => target =>
  void entitySeeders.push(target);
