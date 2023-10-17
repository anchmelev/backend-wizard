import { ChildEntity } from 'typeorm';
import { Field } from './field.entity';
import { FieldType } from './field.type';

@ChildEntity(FieldType.input)
export class InputField extends Field {}
