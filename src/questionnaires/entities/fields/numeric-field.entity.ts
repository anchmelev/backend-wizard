import { Entity, ChildEntity } from 'typeorm';
import { Field } from './field.entity';
import { FieldType } from './field.type';

@Entity()
@ChildEntity(FieldType.numeric)
export class NumericField extends Field {}
