export const entitySeeders: { new (): any }[] = [];

export const EntitySeederService = () => target => {
  entitySeeders.push(target);
};
