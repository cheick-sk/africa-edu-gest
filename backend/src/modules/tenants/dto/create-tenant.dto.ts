import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateTenantDto {
  @ApiProperty({ example: 'Université de Conakry' })
  @IsNotEmpty()
  @IsString()
  universityName: string;

  @ApiProperty({ example: 'uconakry' })
  @IsOptional()
  @IsString()
  subdomain?: string;

  // User details for the initial admin/owner of the university
  @ApiProperty({ example: 'admin@uconakry.com' })
  @IsNotEmpty()
  @IsEmail()
  ownerEmail: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsNotEmpty()
  @IsString()
  ownerPassword: string;

  @ApiProperty({ example: 'Admin' })
  @IsNotEmpty()
  @IsString()
  ownerFirstName: string;

  @ApiProperty({ example: 'User' })
  @IsNotEmpty()
  @IsString()
  ownerLastName: string;
}
