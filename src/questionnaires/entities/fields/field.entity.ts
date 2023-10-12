import { Entity, PrimaryGeneratedColumn, Column, TableInheritance } from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;
}
