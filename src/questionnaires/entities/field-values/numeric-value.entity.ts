import { Entity, ChildEntity, Column } from 'typeorm';
import { FieldValue } from './field-value.entity';

@Entity()
@ChildEntity('numeric-value')
export class NumericValue extends FieldValue {
  @Column({ type: 'integer' })
  value: number;
}
