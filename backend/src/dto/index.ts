import { ApiProperty } from "@nestjs/swagger";

export class AffiliateDto {
    @ApiProperty()
    id: string;
    @ApiProperty({
        minimum: 1,
        maximum: 10,
    })
    monthlyRefferals: number;
    @ApiProperty({
        minimum: 5,
        maximum: 50,
    })
    averageNewProjectPerMonth: number;
    @ApiProperty({
        minimum: 1,
        maximum: 10000,
    })
    existingProjectPerMonth: number;
}
export class CreateAffiliateDto {
    @ApiProperty({ required: false })
    id: string;
    @ApiProperty({
        minimum: 1,
        maximum: 10,
    })
    monthlyRefferals: number;
    @ApiProperty({
        minimum: 5,
        maximum: 50,
    })
    averageNewProjectPerMonth: number;
    @ApiProperty({
        minimum: 1,
        maximum: 10000,
    })
    existingProjectPerMonth: number;
}

