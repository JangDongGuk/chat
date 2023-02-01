import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ChannelChats } from "./Channelchats";
import { ChannelMembers } from "./ChannelMembers";
import { Users } from "./Users";
import { Workspaces } from "./Workspaces";

@Index('WorkspaceId', ['WorkspaceId'], {})
@Entity({ schema: 'chat', name: 'channels'})
export class Channels {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id'})
    id: number;

    @Column('int', { name: 'WorkspaceId', nullable: true })
    WorkspaceId: number | null;

    @Column('varchar', { name: 'name', length: 30 })
    name: string;

    @Column('tinyint', {
        name: 'private',
        nullable: true,
        width: 1,
        default: () => "'0'",
    })
    private: boolean | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @OneToMany(() => ChannelChats, (channelchats) => channelchats.Channel)
    ChannelChats: ChannelChats[];
  
    @OneToMany(() => ChannelMembers, (channelMembers) => channelMembers.Channel, {
      cascade: ['insert'],
    })
    ChannelMembers: ChannelMembers[];
  
    @ManyToMany(() => Users, (users) => users.Channels)
    Members: Users[];
  
    @ManyToOne(() => Workspaces, (workspaces) => workspaces.Channels, {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'WorkspaceId', referencedColumnName: 'id' }])
    Workspace: Workspaces;
    
} 