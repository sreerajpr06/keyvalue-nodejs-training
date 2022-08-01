/**
 * Wraps Controllers for easy import from other modules
 */
import HealthController from "./HealthController";
import EmployeeController from "./EmployeeController";
import { EmployeeService } from "../service/EmployeeService";
import { EmployeeRepository } from "../repository/EmployeeRepository";

export default [
  new HealthController(),
  new EmployeeController(new EmployeeService(new EmployeeRepository()))
];
