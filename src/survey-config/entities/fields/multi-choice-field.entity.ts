import { Column, ChildEntity } from 'typeorm';
import { Field } from './field.entity';
import { FieldType } from './field.type';

@ChildEntity(FieldType.multiChoiceStep)
export class MultiChoiceField extends Field {
  @Column('simple-array')
  options: string[];
}
