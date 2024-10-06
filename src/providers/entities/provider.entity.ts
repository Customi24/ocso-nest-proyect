import { Product } from "src/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()   
export class Provider {
    @PrimaryGeneratedColumn('uuid')
    providerId: string;

    @ApiProperty({
        default: "OCSO Cortazar"
    })
    @Column('text')
    providerName: string;

    @ApiProperty({
        default: "ocso@gmail.com"
    })
    @Column('text',{
        unique: true,
    })
    providerEmail: string;

    @ApiProperty({
        default: "4613027231"
    })
    @Column({
        type: "text",
        nullable: true,
    })
    providerPhoneNumber: string;
    @OneToMany(() => Product, (photo) => photo.provider)
    products: Product[]
}
