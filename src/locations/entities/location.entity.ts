import { combineLatest } from "rxjs";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Manager } from "src/managers/entities/manager.entity";
import { Region } from "src/regions/entities/region.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number;

    @ApiProperty({
        default: "OCSO Cortazar"
    })
    @Column('text')
    locationName: string;

    @ApiProperty({
        default: "Juan de la barrera S/N"
    })
    @Column('text')
    locationAddress: string;

    @ApiProperty({
        default: [12,12]
    })
    @Column('simple-array')
    locationLatLng: number[];

    @ApiProperty({default: "aff19878-eacf-48c5-8541-cf504821e23f"})
    @OneToOne(() => Manager,{
        eager: true,
    })
    @JoinColumn({
        name: "managerId"
    })
    manager: Manager | string;


    @ManyToOne(()=> Region, (region) => region.locations)
    @JoinColumn({
        name: "regionId"
    })
    region: Region;

    @OneToMany(() => Employee, (employee) => employee.location)
    employees: Employee[];
}
