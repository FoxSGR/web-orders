interface EntitySeederConfig {
  order: number;
}

interface EntitySeeder {
  config: EntitySeederConfig;
  clazz: { new (): any };
}

export const entitySeeders: EntitySeeder[] = [];

export const EntitySeederService = (config: EntitySeederConfig) => target =>
  void entitySeeders.push({ config, clazz: target });
