import { Entity, Column, ChildEntity } from 'typeorm';
import { Field } from './field.entity';
import { FieldType } from './field.type';

@Entity()
@ChildEntity(FieldType.multiChoiceStep)
export class MultiChoiceField extends Field {
  @Column({ type: 'text', array: true })
  options: string[];
}
