import { Request, Response } from 'express';
import dashboardListService from '../../services/dashboard/dashboard.list.service';

export class DashboardController {
  public async list(request: Request, response: Response): Promise<Response> {
    const result = await dashboardListService.execute();
    return response.status(200).json(result);
  }
}
