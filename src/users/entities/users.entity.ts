import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RolesEnum } from "../const/roles.const";
import { PostsModel } from "src/posts/entities/posts.entity";
import { BaseModel } from "src/common/entity/base.entity";

/**
 * id: number
 * 
 * nickname: string
 * 
 * email: string
 * 
 * password: string
 * 
 * role: [RolesEnum.USER, RolesEnum.ADMIN]
 * 
 * 
 */

@Entity()
export class UsersModel extends BaseModel{
    @Column({
        length: 20,
        unique: true,
    })
    // 1) 길이가 20을 넘지 않을 것
    // 2) unique한 값이 될 것
    nickname: string;

    @Column({
        unique: true,
    })
    // 1) unique한 값이 될 것
    email: string;

    @Column()
    password: string;

    @Column({
        enum: Object.values(RolesEnum),
        default: RolesEnum.USER,
    })
    role: RolesEnum;

    @OneToMany(()=>PostsModel, (post)=>post.author)
    posts: PostsModel[];
}