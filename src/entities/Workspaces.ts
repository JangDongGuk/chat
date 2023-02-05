import { IsNotEmpty, IsString } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, 
    ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Channels } from "./Channels";
import { Users } from "./Users";
import { WorkspaceMembers } from "./WorkspaceMembers";

@Index('name', ['name'], { unique: true })
@Index('url', ['url'], { unique: true })
@Index('OwnerId', ['OwnerId'], {})
@Entity({ schema: 'chat', name: 'workspaces'})
export class Workspaces {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'OwnerId', nullable: true })
    OwnerId: number | null;

    @IsString()
    @IsNotEmpty()
    @Column('varchar', { name: 'name', unique: true, length: 30 })
    name: string;
    
    @IsString()
    @IsNotEmpty()
    @Column('varchar', { name: 'url', length: 30 })
    url: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;

    @OneToMany(() => Channels, (channels) => channels.Workspace)
    Channels: Channels[];
    
    @OneToMany(
        () => WorkspaceMembers,
        (workspacemembers) => workspacemembers.Workspace,
        { cascade: ['insert'] },
      )
      WorkspaceMembers: WorkspaceMembers[];
    
      @ManyToOne(() => Users, (users) => users.Workspaces, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      @JoinColumn([{ name: 'OwnerId', referencedColumnName: 'id' }])
      Owner: Users;
    
      @ManyToMany(() => Users, (users) => users.Workspaces)
      Members: Users[];
}