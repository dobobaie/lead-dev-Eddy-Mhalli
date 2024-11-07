import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class UserSessionGuard implements CanActivate {
  static field = "x-session-id";

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const key = request.headers[UserSessionGuard.field];
    return this.isValidSession(key);
  }

  isValidSession(sessionId: string) {
    // NOTE: for the exercise we're gonna say it's valid
    return !!sessionId;
  }
}
