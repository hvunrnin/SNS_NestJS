import {PipeTransform, Injectable, ArgumentMetadata, BadGatewayException, BadRequestException} from '@nestjs/common';

// 직접 만드는 pipe
@Injectable()
export class PasswordPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        // value는 실제 받은 data, metatdata는 실제 데이터에 관련된 데이터, 즉 데이터를 설명해주는 데이터
        if(value.toString().length > 8){
            throw new BadRequestException('비밀번호는 8자 이하로 입력해주세용');
        }

        return value.toString();
    }
}

@Injectable()
export class MaxLengthPipe implements PipeTransform{
    constructor(private readonly length: number,
        private readonly subject: string){
    }
    transform(value: any, metadata: ArgumentMetadata) {
        if(value.toString().length > this.length){
            throw new BadRequestException(`${this.subject}의 최대 길이는 ${this.length}입니다`);
        }

        return value.toString();
    }
}

@Injectable()
export class MinLengthPipe implements PipeTransform{
    constructor(private readonly length: number){

    }
    transform(value: any, metadata: ArgumentMetadata) {
        if(value.toString().length < this.length){
            throw new BadRequestException(`최소 길이는 ${this.length}입니다`);
        }

        return value.toString();
    }
}