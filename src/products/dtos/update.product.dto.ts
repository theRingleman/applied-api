import { IsNotEmpty, Length, Max, Min } from "class-validator";

export class UpdateProductDto {
  @Length(3, 100)
  readonly name: string;

  @Length(5, 1000)
  readonly description: string;

  @Min(1)
  @Max(20000)
  readonly price: number;

  constructor(name: string, description: string, price: number) {
    this.name = name;
    this.description = description;
    this.price = price;
  }
}
