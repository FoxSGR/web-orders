import { EntityListConfig } from '../entity-list';

interface SmartFormEntitySelect {
  type: 'entity-select';
  config: EntityListConfig<any>;
}

type SmartFormItem = SmartFormEntitySelect; // | cenas | cenas2

export interface SmartForm {
  items: SmartFormItem[];
}
