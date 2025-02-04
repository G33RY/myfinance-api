import { Injectable, NestMiddleware } from '@nestjs/common';
import { RequestContext } from '@/context/context.model';
import { AuthService } from '@/auth/auth.service';


@Injectable()
export class ContextMiddleware<Request = any, Response = any> implements NestMiddleware<Request, Response> {

  constructor(
    private readonly authService: AuthService,
  ) {
  }

  async use(req: Request, res: Response, next: () => void) {
    const user = await this.authService.getCurrentUser();
    RequestContext.cls.run(new RequestContext(req, res, user), next);
  }
}