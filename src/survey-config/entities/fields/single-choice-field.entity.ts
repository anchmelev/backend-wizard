import { Column, ChildEntity } from 'typeorm';
import { Field } from './field.entity';
import { FieldType } from './field.type';

@ChildEntity(FieldType.singleChoice)
export class SingleChoiceField extends Field {
  @Column('simple-array')
  options: string[];
}
