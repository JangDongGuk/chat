import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Channels } from "./Channels";
import { Users } from "./Users";

@Index('UserId', ['UserId'], {})
@Index('ChannelId', ['ChannelId'], {})
@Entity({ schema: 'chat', name: 'channelchats'})
export class ChannelChats {
    @PrimaryColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'UserId', nullable: true })
    UserId: number | null;

    @Column('int', { name: 'ChannelId', nullable: true })
    ChannelId: number | null;

    @Column('text', { name: 'content' })
    content: string;

    @UpdateDateColumn()
    updataedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Channels, (channels) => channels.ChannelChats, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })

    @ManyToOne(() => Users, (users) => users.ChannelChats, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    
    @JoinColumn([{ name: 'ChannelId', referencedColumnName: 'id' }])
    Channel: Channels;

    @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
    User: Users;
}