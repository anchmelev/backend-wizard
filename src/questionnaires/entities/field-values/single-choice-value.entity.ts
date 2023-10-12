import { Entity, Column, ChildEntity } from 'typeorm';
import { FieldValue } from './field-value.entity';

@Entity()
@ChildEntity('single-choice-value')
export class SingleChoiceValue extends FieldValue {
  @Column({ type: 'text' })
  selectedOption: string;
}
