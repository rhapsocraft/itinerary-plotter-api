import { RequestHandler } from 'express';

enum HealthCheckStatus {
  OK = 'ok',
}

type HealthCheckResponse = {
  status: HealthCheckStatus;
  serverTime: {
    utcTime: string;
    localTime: string;
  };
};

export const healthCheckHandler: RequestHandler<any, HealthCheckResponse, any, any> = async (req, res) => {
  const now = new Date();

  res.send({
    status: HealthCheckStatus.OK,
    serverTime: {
      utcTime: now.toUTCString(),
      localTime: now.toString(),
    },
  });
};
