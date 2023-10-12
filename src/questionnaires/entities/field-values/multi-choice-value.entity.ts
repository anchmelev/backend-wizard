import { Entity, Column, ChildEntity } from 'typeorm';
import { FieldValue } from './field-value.entity';

@Entity()
@ChildEntity('multi-choice-value')
export class MultiChoiceValue extends FieldValue {
  @Column({ type: 'text', array: true })
  selectedOptions: string[];
}
