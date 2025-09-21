import { RequestHandler } from 'express';
import pc from 'picocolors';

function getMethodColor(method: string) {
  const map: Record<string, string> = {
    GET: pc.green(method),
    POST: pc.magenta(method),
    DELETE: pc.red(method),
  };

  return map[method] ?? pc.gray(method);
}

function getStatusColor(statusCode: number) {
  const firstDigit = `${statusCode}`[0];

  const map: Record<string, string> = {
    '2': pc.green(statusCode),
    '4': pc.red(statusCode),
    '3': pc.magenta(statusCode),
  };

  return map[firstDigit] ?? statusCode;
}

export function loggingMiddleware(): RequestHandler {
  return async (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
      console.log(`${getMethodColor(req.method)} ${getStatusColor(res.statusCode)} ${req.path} ${pc.blue(`${Date.now() - start}ms`)}`);
    });

    next();
  };
}
