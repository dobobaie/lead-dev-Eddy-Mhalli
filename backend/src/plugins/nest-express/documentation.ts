import fs from "fs";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function initDocumentation(app: NestExpressApplication): void {
  const documentConfig = new DocumentBuilder()
    .setTitle("Swagger API")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);
  fs.writeFileSync("./swagger.json", JSON.stringify(document));
  SwaggerModule.setup(`/swagger`, app, document);
}
