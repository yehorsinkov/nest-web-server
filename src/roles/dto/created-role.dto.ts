import { ApiProperty } from "@nestjs/swagger";

export class CreatedRoleDTO {
    @ApiProperty({ example: 'ADMINISTRATOR', description: 'User role state' })
    readonly title: string;
}