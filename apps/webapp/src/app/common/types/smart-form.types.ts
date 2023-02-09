import { EntityListConfig } from '../components/entity-list/entity-list.types';
import { Entity } from '../models/entity';
import { WOIconItemMap, WOItemMap } from '../wo-common.types';
import { EntityType } from './entity.types';
import { FileData } from './file.types';

interface ISmartFormItem<T> {
  label?: string;
  default?: T;
  required?: boolean;
  onChange?: (value: T | null | undefined, state: SmartFormState) => void;
  disabled?: (state: SmartFormState, prop: string) => boolean;
  hidden?: (state: SmartFormState, prop: string) => boolean;

  generation?: {
    /**
     * Prop path of the generated model.
     */
    prop?: string;

    /**
     * How to put this item in an array along with items.
     */
    flatten?: {
      by: string;
      to: string;
    };
  };
}

export interface SmartFormTextInput extends ISmartFormItem<string> {
  type: 'text-input';
  placeholder: string;
  maxLength?: number;
}

export interface SmartFormTextArea extends ISmartFormItem<string> {
  type: 'text-area';
  placeholder: string;
}

export interface SmartFormNumberInput extends ISmartFormItem<number> {
  type: 'number-input';
  placeholder: string;
  maxLength?: number;
  unit?: string;
  min?: number;
  max?: number;
}

export interface SmartFormDate extends ISmartFormItem<Date> {
  type: 'date';
  dateType: 'date-time' | 'date' | 'time';
}

export interface SmartFormHeader extends ISmartFormItem<void> {
  type: 'header';
}

export interface SmartFormMultiple extends ISmartFormItem<any> {
  type: 'multiple';
  children: SmartFormItem<any>;
  default: any;
}

export interface SmartFormGroup extends ISmartFormItem<any> {
  type: 'group';
  children: { [key: string]: SmartFormItem<any> };
  inline?: boolean;
}

export interface SmartFormEntitySelect<T extends Entity[]>
  extends ISmartFormItem<T> {
  type: 'entity-select';
  entityName: EntityType;
  config: Partial<EntityListConfig<T[number]>>;
  mode?: 'accordion' | 'modal';
  modalHeader?: string;
}

export interface SmartFormChoices<T extends string>
  extends ISmartFormItem<any> {
  type: 'choices';
  choices: WOItemMap<T> | WOIconItemMap<T>;
}

export interface SmartFormFiles {
  files: FileData[];
}

export interface SmartFormFileUpload extends ISmartFormItem<any> {
  type: 'file-upload';
  mimeType: string;
  multiple: boolean;
  maxSizeMB: number;
  hasDefault?: boolean;
}

export interface SmartFormPhone {
  prefix?: string;
  value: string;
}
export interface SmartFormPhoneInput extends ISmartFormItem<SmartFormPhone> {
  type: 'phone-input';
}

export interface SmartFormColor extends ISmartFormItem<string> {
  type: 'color';
}

export interface SmartFormMap extends ISmartFormItem<object> {
  type: 'map';
  keys: string[] | number[];
  value: SmartFormItem;
}

export interface SmartFormState {
  values: { [key: string]: any };
}

export type SmartFormItem<T = any> =
  | SmartFormHeader
  | SmartFormTextInput
  | SmartFormTextArea
  | SmartFormNumberInput
  | SmartFormDate
  | SmartFormEntitySelect<any>
  | SmartFormChoices<any>
  | SmartFormFileUpload
  | SmartFormPhoneInput
  | SmartFormColor
  | SmartFormMap
  | SmartFormMultiple
  | SmartFormGroup;

export interface SmartForm {
  items: { [key: string]: SmartFormItem };
}
