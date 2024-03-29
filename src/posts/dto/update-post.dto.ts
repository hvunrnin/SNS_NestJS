import { PartialType, PickType } from "@nestjs/mapped-types";
import { PostsModel } from "../entities/posts.entity";
import { CreatePostDto } from "./create-post.dto";
import { IsOptional, IsString } from "class-validator";
import { stringValidationMessage } from "src/common/validation-message/string-validation.message";

export class UpdatePostDto extends PartialType(CreatePostDto){ // 굳이 상속 안 받아도 되긴함 그냥 문맥상
    @IsString({
        message: stringValidationMessage
    })
    @IsOptional() // 값 없어도 됨
    title?: string;

    @IsString({
        message: stringValidationMessage
    })
    @IsOptional()
    content: string;
}