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
        // @Column({ type: 'date' })
        // public joinDate: string;
        // @Column({ nullable: false })
        // public role: string;
        // @Column({ nullable: false })
        // public status: string;
        @Column({ nullable: false })
        public experience: number;

        @Column({ nullable: true })
        public password: string;

        @Column({ nullable: true })
        public role: string;

        @ManyToOne(() => Department, { cascade: true })
        @JoinColumn()
        public department: Department;
            @Column({ nullable: false })
            public departmentId: string;

        @OneToMany(() => Address, (address) => address.employee)
        @JoinColumn()
            public address: Address[];
}