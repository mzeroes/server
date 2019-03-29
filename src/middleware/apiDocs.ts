import { Router } from "express";
import swaggerUi from "swagger-ui-express";

export const handleAPIDocs = (router: Router) =>
  router.use("/api-docs",
    swaggerUi.serve,
    swaggerUi.setup((settings: any) => {
      settings.SwaggerRoute = "../config/swagger.yml";
    })
  );
