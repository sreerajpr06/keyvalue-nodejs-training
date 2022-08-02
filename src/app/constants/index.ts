const APP_CONSTANTS = {
    apiPrefix: "/api",
    params: "params",
    query: "query",
    body: "body",
    authorizationHeader: "Authorization",
    bearer: "Bearer",
    basePath:`http://localhost:${process.env.PORT}`,

    // Add the short name of the service below
    service: "employee-app"
};

export const USER_ROLES = {
    admin: "admin",
    developer: "developer",
    manager: "manager",
    engineer: "engineer",
    guest: "guest"
}

export default APP_CONSTANTS;
