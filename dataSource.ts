import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { ChannelChats } from './src/entities/ChannelChats';
import { ChannelMembers } from './src/entities/ChannelMembers';
import { Users } from './src/entities/Users';
import { WorkspaceMembers } from './src/entities/WorkspaceMembers';
import { Workspaces } from './src/entities/Workspaces';
import { Channels } from './src/entities/Channels';


dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    Channels,
    ChannelChats,
    ChannelMembers,
    Users,
    WorkspaceMembers,
    Workspaces,
  ],
  migrations: [__dirname + '/src/migrations/*.ts'],
  charset: 'utf8mb4_general_ci',
  synchronize: false,
  logging: true,
});

export default dataSource;