import { IsNotEmpty, Length, Max, Min } from "class-validator";

export class CreateProductDto {
  @Length(3, 100)
  @IsNotEmpty()
  readonly name: string;

  @Length(5, 1000)
  @IsNotEmpty()
  readonly description: string;

  @Min(1)
  @Max(20000)
  @IsNotEmpty()
  readonly price: number;

  constructor(name: string, description: string, price: number) {
    this.name = name;
    this.description = description;
    this.price = price;
  }
}
