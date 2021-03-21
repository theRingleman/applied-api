import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { Length, Max, Min } from "class-validator";

@Entity({name: "products"})
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({unique: true})
  @Column({length: 100})
  name: string;

  @Column({ length: 1000 })
  description: string;

  @Column({type: "int"})
  price: number;
}
