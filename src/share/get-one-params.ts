import { Transform } from 'class-transformer';
import { Min, Max, IsInt } from 'class-validator';

export class FindOneParams {
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  id: number;
}
