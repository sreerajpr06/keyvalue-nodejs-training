import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Address } from "./Address";
import { Department } from "./Department";

@Entity("employee")
    export class Employee extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
        @Column({ nullable: false })
        public name: string;

        @ManyToOne(() => Department, { cascade: true })
        @JoinColumn()
        public department: Department;
            @Column({ nullable: false })
            public departmentId: string;

        @OneToMany(() => Address, (address) => address.employee)
        @JoinColumn()
            public address: Address[];
}