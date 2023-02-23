import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Channels } from "./Channels";
import { Users } from "./Users";

@Index('UserId', ['UserId'], {})
@Index('ChannelId', ['ChannelId'], {})
@Entity({ schema: 'chat', name: 'channelchats'})
export class ChannelChats {
    @PrimaryColumn({ type: 'int', name: 'id' })
    id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
      description: '하이',
      example:'반가워요'
    })
    @Column('text', { name: 'content' })
    content: string;

    @UpdateDateColumn()
    updataedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @Column('int', { name: 'UserId', nullable: true })
    UserId: number | null;

    @Column('int', { name: 'ChannelId', nullable: true })
    ChannelId: number | null;

    @ManyToOne(() => Users, (users) => users.ChannelChats, {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
    User: Users;

    @ManyToOne(() => Channels, (channels) => channels.ChannelChats, {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'ChannelId', referencedColumnName: 'id' }])
    Channel: Channels;
}