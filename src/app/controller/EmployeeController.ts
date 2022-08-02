import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import validationMiddleware from "../middleware/ValidationMiddleware";
import { UuidDto } from "../dto/Uuid";
import { UpdateEmployeeDto } from "../dto/UpdateEmployee";

class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.get(
      `${this.path}`, 
      this.getEmployee
    );
    this.router.get(
      `${this.path}/:id`, 
      validationMiddleware(UuidDto, APP_CONSTANTS.params),
      this.getEmployeeById
    )
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
      // this.asyncRouteHandler(this.createEmployee)
      this.createEmployee
    );
    this.router.delete(
      `${this.path}/:id`,
      validationMiddleware(UuidDto, APP_CONSTANTS.params),
      this.deleteEmployee
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(UuidDto, APP_CONSTANTS.params),
      validationMiddleware(UpdateEmployeeDto, APP_CONSTANTS.body),
      this.updateEmployee
    )
  }

  private getEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeService.getAllEmployees();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  private getEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.getEmployeeById(request.params);
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      )
    } catch (err) {
      next(err)
    }
  }

  private createEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.employeeService.createEmployee(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private deleteEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.employeeService.deleteEmployee(request.params);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch(err) {
      next(err);
    }
  }

  private updateEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.employeeService.updateEmployee(request.body, request.params);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err)
    }
  }
}

export default EmployeeController;
