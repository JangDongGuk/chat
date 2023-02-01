import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { Channels } from "./Channels";
import { Users } from "./Users";

@Index('UserId', ['UserId'], {})
@Entity({ schema: 'chat', name: 'channelmembers'})
export class ChannelMembers {
    @Column('int', { primary: true, name: 'UserId' })
    UserId: number;

    @Column('int', { primary: true, name: 'ChannelId' })
    ChannelId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Channels, (channels) => channels.ChannelMembers, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'ChannelId', referencedColumnName: 'id' }])
    Channel: Channels;

    @ManyToOne(() => Users, (users) => users.ChannelMembers, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
    User: Users;
    
}
