import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { Users } from "./Users";
import { Workspaces } from "./Workspaces";

@Index('UserId', ['UserId'], {})
@Entity({ schema: 'chat', name: 'workspacemembers' })
export class WorkspaceMembers {
    @Column({ primary: true, name: 'UserId' })
    UserId: number;

    @Column({ primary: true, name: 'WorkspaceId' })
    WorkspaceId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column('datetime', { name: 'loggedInAt', nullable: true })
    loggedInAt: Date | null;

    @ManyToOne(() => Workspaces, (workspaces) => workspaces.WorkspaceMembers, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
      @JoinColumn([{ name: 'WorkspaceId', referencedColumnName: 'id' }])
      Workspace: Workspaces;
    
      @ManyToOne(() => Users, (users) => users.WorkspaceMembers, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
      @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
      User: Users;
}