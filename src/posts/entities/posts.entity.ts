import { IsString } from "class-validator";
import { BaseModel } from "src/common/entity/base.entity";
import { stringValidationMessage } from "src/common/validation-message/string-validation.message";
import { UsersModel } from "src/users/entities/users.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PostsModel extends BaseModel{
    // 1) UserModel과 연동하기 (Foreign Key를 이용해서)
    // 2) null이 될 수 없다
    @ManyToOne(()=>UsersModel, (user)=>user.posts,{
        nullable: false,
    })
    author: UsersModel;

    @Column()
    // 이 값은 무조건 스트링이여야되고 이를 검증하기 위해
    @IsString({
        message: stringValidationMessage,
    })
    title: string;

    @Column()
    @IsString({
        message: stringValidationMessage,
    })
    content: string;

    @Column()
    likeCount: number;

    @Column()
    commentCount: number;
}