import { RequestHandler } from 'express';
import pc from 'picocolors';

function getMethodColor(method: string) {
  const map: Record<string, string> = {
    GET: pc.green(method),
    POST: pc.magenta(method),
  };

  return map[method] ?? pc.gray(method);
}

export function loggingMiddleware(): RequestHandler {
  return async (req, res, next) => {
    const start = Date.now();

    next();
    console.log(`${getMethodColor(req.method)} ${req.path} ${pc.blue(`${Date.now() - start}ms`)}`);
  };
}
