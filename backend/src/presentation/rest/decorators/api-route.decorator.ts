import { ApiConsumes, ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";

export function ApiRoute(params: {
  summary: string;
  contentType?: string;
  param?: any;
  query?: any;
  body?: any;
  errors?: any[];
  response?: any;
  responseType?: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    if (descriptor.value === undefined) {
      throw new Error("ApiRoute must be used as a method decorator");
    }

    ApiOperation({ summary: params.summary })(target, propertyKey, descriptor);

    if (params.contentType) {
      ApiConsumes(params.contentType)(target, propertyKey, descriptor);
    }

    if (params.body) {
      ApiBody({ type: params.body })(target, propertyKey, descriptor);
    }

    ApiResponse({
      status: 200,
      type: params.response,
      content: params.contentType
        ? {
            [params.contentType]: {
              schema: {
                type: params.responseType,
              },
            },
          }
        : undefined,
    })(target, propertyKey, descriptor);

    if (params.errors) {
      params.errors.forEach((error) => {
        ApiResponse({
          status: error.status,
          type: error,
        })(target, propertyKey, descriptor);
      });
    }
    return descriptor;
  };
}
