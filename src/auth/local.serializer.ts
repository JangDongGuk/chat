import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/Users";
import { Repository } from "typeorm";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalSerializer extends PassportSerializer {
    constructor( 
        private readonly authService: AuthService,
        @InjectRepository(Users) private usersRepository: Repository<Users>,) 
        {
            super();
        }
    serializeUser(user: Users, done: CallableFunction) {
        console.log(user);
        done(null, user.id);
    }

    async deserializeUser(userId: any, done: Function) {
        return await this.usersRepository.findOneOrFail({
            where: { id: +userId },
            select: [ 'id', 'email', 'nickname' ],
            relations: [ 'Workspaces' ],
        })
        .then((user) => {
            console.log('user', user);
            done(null, user);
        })
        .catch((error) => done(error));
    }
}