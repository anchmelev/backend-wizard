import { ChildEntity } from 'typeorm';
import { Field } from './field.entity';
import { FieldType } from './field.type';

@ChildEntity(FieldType.numeric)
export class NumericField extends Field {}
