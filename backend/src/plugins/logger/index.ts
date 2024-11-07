import { Injectable } from "@nestjs/common";
import winston, { format, transports } from "winston";
import * as _ from "lodash";

import config from "../../config/default";

export const getLastCaller = () => {
  const prepareStackTraceOrigin = Error.prepareStackTrace;
  const error = new Error();

  Error.prepareStackTrace = (_, stack: NodeJS.CallSite[] = []) => {
    const filteredStack = stack.filter(
      (stack, index) =>
        !(
          index < 3 ||
          !stack.getFileName() ||
          stack.getFileName()?.startsWith("node:") ||
          stack.getFileName()?.includes("node_modules")
        ),
    );

    const matchedStack =
      filteredStack.find(
        (stack) => stack.getFunctionName() && stack.getTypeName(),
      ) ?? filteredStack[0];

    const instance = matchedStack.getTypeName() ?? "Logger";
    const method = matchedStack.getFunctionName() ?? "";
    const line = matchedStack.getLineNumber() ?? "0";

    return `${instance}.${method}:${line}`;
  };

  const lastFilenameCalled = error.stack;
  Error.prepareStackTrace = prepareStackTraceOrigin;
  return lastFilenameCalled;
};

export class NativeLogger extends winston.Logger {
  private context = "Logger";

  private static defaultLogger: NativeLogger | undefined;

  constructor(readonly options: { context?: string } = {}) {
    const allowedTransports: winston.transport[] = [];

    if (config.logger.console.level !== "none") {
      allowedTransports.push(
        new transports.Console({
          silent: config.logger.console.silent,
          level: config.logger.console.level,
          format: format.combine(
            format.errors({ stack: true }),
            format.colorize({ all: true }),
            format.label({ label: "[LOGGER]" }),
            format.timestamp({ format: "YY-MM-DD HH:mm:ss" }),
            format.printf((info) => {
              const message = `${info.label}  ${info.timestamp} ${info.level}: ${info.message} [${info.context}]`;
              const metadata = Object.keys(info.metadata).length
                ? ` ⬇️\n${JSON.stringify(info.metadata, null, 1)}`
                : "";
              return message + metadata;
            }),
          ),
        }),
      );
    }

    const loggerOptions: winston.LoggerOptions = {
      silent: allowedTransports.length === 0,
      transports: allowedTransports,
    };

    // Note: we finally call the parent
    super(loggerOptions);

    const logger = new winston.Logger(loggerOptions);
    this.log = ((...args: any[]) => {
      const level = logger.levels[args[0]] === undefined ? "info" : args.shift();

      const message =
        typeof args[0] === "string"
          ? args.shift()
          : args[0]?.message && args.shift().message;

      const cleanArgs = args.filter((arg) => typeof arg === "object");
      const rawMetadata = Object.assign({}, ...cleanArgs);
      const metadata = _.omit(rawMetadata, ["context"]);

      const context =
        rawMetadata.context ?? options.context ?? getLastCaller() ?? this.context;

      return logger.log(level, message, { context, metadata });
    }) as any;

    // NOTE: assign different levels with arguments
    Object.keys(this.levels).forEach((level) => {
      this[level] = (...args: any[]) => (this.log as any)(level, ...args);
    });
  }

  public static get default(): NativeLogger {
    this.defaultLogger ||= new NativeLogger();
    return this.defaultLogger;
  }
}

@Injectable()
export class Logger extends NativeLogger {
  constructor() {
    super();
  }
}
