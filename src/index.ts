// port-scanner-lite: simple TCP port scanner
import { Socket } from "node:net";

export interface PortResult {
  host: string;
  port: number;
  open: boolean;
  latencyMs: number;
  error?: string;
}

export function checkPort(host: string, port: number, timeout = 1500): Promise<PortResult> {
  return new Promise((resolve) => {
    const start = Date.now();
    const socket = new Socket();
    let done = false;
    const finish = (open: boolean, error?: string) => {
      if (done) return;
      done = true;
      socket.destroy();
      resolve({ host, port, open, latencyMs: Date.now() - start, error });
    };
    socket.setTimeout(timeout);
    socket.once("connect", () => finish(true));
    socket.once("timeout", () => finish(false, "timeout"));
    socket.once("error", (e) => finish(false, e.message));
    socket.connect(port, host);
  });
}

export async function scanPorts(
  host: string,
  ports: number[],
  opts: { timeout?: number; concurrency?: number } = {}
): Promise<PortResult[]> {
  const { timeout = 1500, concurrency = 50 } = opts;
  const results: PortResult[] = [];
  let i = 0;
  const workers = Array.from({ length: Math.min(concurrency, ports.length) }, async () => {
    while (i < ports.length) {
      const idx = i++;
      results[idx] = await checkPort(host, ports[idx], timeout);
    }
  });
  await Promise.all(workers);
  return results;
}

export function range(from: number, to: number): number[] {
  const out: number[] = [];
  for (let p = from; p <= to; p++) out.push(p);
  return out;
}

export const COMMON_PORTS = [21, 22, 23, 25, 53, 80, 110, 143, 443, 465, 587, 993, 995, 3306, 3389, 5432, 6379, 8080, 8443, 27017];
