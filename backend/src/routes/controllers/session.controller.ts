import { Request, Response } from 'express';
import sessionCreateService from '../../services/session/session.create.service';

export class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const payload = {
      email,
      password,
    };

    const user = await sessionCreateService.execute(payload);

    if (!user) {
      return response.status(401).send();
    }

    return response.status(202).send();
  }
}
