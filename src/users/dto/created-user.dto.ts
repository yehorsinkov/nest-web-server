import { ApiProperty } from "@nestjs/swagger";

export class CreatedUserDTO {
    @ApiProperty({ example: 'test@gmail.com', description: 'Account email/login' })
    readonly email: string;
    @ApiProperty({ example: 'qwerty123', description: 'Account password' })
    readonly password: string;
    @ApiProperty({ example: 'John', description: 'User name' })
    readonly name: string;
    @ApiProperty({ example: 'Smith', description: 'User family name' })
    readonly family_name: string;
}
