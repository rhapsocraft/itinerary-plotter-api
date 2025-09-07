import { RequestHandler } from 'express';

enum HealthCheckStatus {
  OK = 'ok',
}

type HealthCheckResponse = {
  user: string | undefined;
  status: HealthCheckStatus;
  serverTime: {
    utcTime: string;
    localTime: string;
  };
};

export const healthCheckHandler: RequestHandler<any, HealthCheckResponse, any, any> = async (req, res) => {
  const now = new Date();

  res.send({
    user: req.isAuthenticated() ? JSON.stringify(req.user) : undefined,
    status: HealthCheckStatus.OK,
    serverTime: {
      utcTime: now.toUTCString(),
      localTime: now.toString(),
    },
  });
};
