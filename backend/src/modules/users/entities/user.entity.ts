import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
// import { Tenant } from '../../tenants/entities/tenant.entity'; // Assuming Tenant entity exists

@Entity('app_users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  university_id: string; // This will link to Tenant/University
  // @ManyToOne(() => Tenant)
  // @JoinColumn({ name: 'university_id' })
  // tenant: Tenant;


  @Column({ unique: true }) // Should be unique within a tenant, handled by logic
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @Column()
  password_hash: string; // Not exposed in API responses

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  first_name?: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  last_name?: string;

  // Add other fields like profile_picture_url, email_verified_at, etc.

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
