/**
 * Wraps Controllers for easy import from other modules
 */
import HealthController from "./HealthController";
import EmployeeController from "./EmployeeController";
import { EmployeeService } from "../service/EmployeeService";
import { EmployeeRepository } from "../repository/EmployeeRepository";
import DepartmentController from "./DepartmentController";
import { DepartmentService } from "../service/DepartmentService";
import { DepartmentRepository } from "../repository/DepartmentRepository";
// import AddressController from "./AddressController";
// import { AddressService } from "../service/AddressService";
// import { AddressRepository } from "../repository/AddressRepository";

export default [
  new HealthController(),
  new EmployeeController(new EmployeeService(new EmployeeRepository())),
  new DepartmentController(new DepartmentService(new DepartmentRepository())),
  // new AddressController(new AddressService(new AddressRepository()))
];
