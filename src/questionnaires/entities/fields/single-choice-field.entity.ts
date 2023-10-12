import { Entity, Column, ChildEntity } from 'typeorm';
import { Field } from './field.entity';
import { FieldType } from './field.type';

@Entity()
@ChildEntity(FieldType.singleChoice)
export class SingleChoiceField extends Field {
  @Column({ type: 'text', array: true })
  options: string[];
}
