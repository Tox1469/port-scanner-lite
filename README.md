[![CI](https://img.shields.io/github/actions/workflow/status/Tox1469/port-scanner-lite/ci.yml?style=flat-square&label=ci)](https://github.com/Tox1469/port-scanner-lite/actions)
[![License](https://img.shields.io/github/license/Tox1469/port-scanner-lite?style=flat-square)](LICENSE)
[![Release](https://img.shields.io/github/v/release/Tox1469/port-scanner-lite?style=flat-square)](https://github.com/Tox1469/port-scanner-lite/releases)
[![Stars](https://img.shields.io/github/stars/Tox1469/port-scanner-lite?style=flat-square)](https://github.com/Tox1469/port-scanner-lite/stargazers)

---

# port-scanner-lite

Scanner TCP minimalista que verifica se uma porta está aberta estabelecendo conexão.

## Instalação

```bash
npm install port-scanner-lite
```

## Uso

```ts
import { scanPorts, COMMON_PORTS, range } from "port-scanner-lite";

const results = await scanPorts("example.com", COMMON_PORTS, { timeout: 1000, concurrency: 30 });
const open = results.filter((r) => r.open);

await scanPorts("127.0.0.1", range(1, 1024));
```

## API

- `checkPort(host, port, timeout?)` — checa uma porta
- `scanPorts(host, ports, { timeout?, concurrency? })` — varre várias
- `range(from, to)` — helper para lista de portas
- `COMMON_PORTS` — portas comuns

## Licença

MIT