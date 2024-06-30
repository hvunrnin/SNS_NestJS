import { IsIn, IsNumber, IsOptional } from "class-validator";

export class PaginatePostDto{ // 커서 기반 pagination
    // 이전 마지막 데이터의 ID
    // 이 property에 입력된 ID 보다 높은 ID 부터 값 불러오기
    @IsNumber()
    @IsOptional()
    where__id_more_than?: number;

    // 정렬
    // createdAt ->  생성된 시간의 순으로 정렬
    @IsIn(['ASC'])
    @IsOptional()
    order__createdAt?: 'ASC' = 'ASC';

    // 20개의 데이터 받기
    @IsNumber()
    @IsOptional()
    take: number=20;
}