import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('app_universities') // Matches PostgreSQL schema
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ unique: true, nullable: true })
  @ApiProperty({ required: false })
  subdomain?: string;

  @Column({ name: 'owner_id' }) // Assuming owner_id is a UUID string
  @ApiProperty()
  owner_id: string;


  // Add other fields from app_universities schema: custom_domain, branding_logo_url etc.

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
