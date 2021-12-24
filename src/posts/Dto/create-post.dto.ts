import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @IsOptional()
  body: string;
}
