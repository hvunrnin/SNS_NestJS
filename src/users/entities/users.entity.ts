import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RolesEnum } from "../const/roles.const";
import { PostsModel } from "src/posts/entities/posts.entity";
import { BaseModel } from "src/common/entity/base.entity";
import { IsEmail, IsString, Length, ValidationArguments, max } from "class-validator";
import { lengthValidationMessage } from "src/common/validation-message/length-validation.message";
import { stringValidationMessage } from "src/common/validation-message/string-validation.message";
import { emailValidationMessage } from "src/common/validation-message/email-validation.message";
import { Exclude } from "class-transformer";

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
//@Exclude() //다 가리고 싶음 (보여주고 싶은 거만 @Expose())
export class UsersModel extends BaseModel{
    @Column({
        length: 20,
        unique: true,
    })
    @IsString({
        message: stringValidationMessage,
    })
    @Length(1,20,{
        //message: '닉네임은 1~20자 사이로 입력해주세요~'
        message: lengthValidationMessage,
    })
    // 1) 길이가 20을 넘지 않을 것
    // 2) unique한 값이 될 것
    nickname: string;

    @Column({
        unique: true,
    })
    @IsString({
        message: stringValidationMessage,
    })
    @IsEmail({}, {
        message: emailValidationMessage,
    })
    // 1) unique한 값이 될 것
    email: string;

    @Column()
    @IsString({
        message: stringValidationMessage,
    })
    @Length(3,8,{
        message: lengthValidationMessage,
    })
    /**
     * Request
     * frontend -> backend
     * plain object(JSON) -> backend에서 dto 형태로 바꿔서 다룸
     * 
     * Response
     * backend -> frontend
     * class instace(dto) -> plain object (JSON)
     * 
     * toClassOnly -> class instance로 변환될 때만 (요청 시)
     * toPlainOnly -> plain object로 변환될 때만 (응답 시)
     */
    @Exclude({
        toPlainOnly: true, // 응답 시 비밀번호 보안
    }) 
    password: string;

    @Column({
        enum: Object.values(RolesEnum),
        default: RolesEnum.USER,
    })
    role: RolesEnum;

    @OneToMany(()=>PostsModel, (post)=>post.author)
    posts: PostsModel[];
}