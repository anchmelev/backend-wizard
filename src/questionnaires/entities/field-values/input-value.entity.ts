import { Entity, ChildEntity, Column } from 'typeorm';
import { FieldValue } from './field-value.entity';

@Entity()
@ChildEntity('input-value')
export class InputValue extends FieldValue {
  @Column()
  value: string;
}
