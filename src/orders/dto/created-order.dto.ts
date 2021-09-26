import { ApiProperty } from "@nestjs/swagger";

export class CreatedOrderDTO {
    @ApiProperty({ example: 1, description: 'User id which do order' })
    readonly userId: number;

    @ApiProperty({ example: 1, description: 'Payment method: card or cash' })
    readonly paymentMethodId: number;

    @ApiProperty({ example: 1, description: 'Shipping method: postman or pickup' })
    readonly shippingMethodId: number;

    @ApiProperty({ example: 'Kyiv, NP#3', description: 'User address: postman or other' })
    readonly address: string;
}