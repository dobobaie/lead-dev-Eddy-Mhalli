import { it } from "vitest";
import { Test } from "@nestjs/testing";

it("should be able to instantiate application modules", async () => {
  const { AppModule } = await import("./app.module");
  await Test.createTestingModule({ imports: [AppModule] }).compile();
});
