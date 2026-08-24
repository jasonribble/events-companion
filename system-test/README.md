# System Test (TypeScript)

## Prerequisites

- gh CLI with the optivem extension: `gh extension install optivem/gh-optivem`
- Docker Desktop (running)
- Node.js 22+

## Running Tests

All commands are run from the repo root. Point `GH_OPTIVEM_CONFIG` at the variant yaml at the repo root once per shell, then run the verbs without per-flag overrides:

```pwsh
$env:GH_OPTIVEM_CONFIG = "gh-optivem-monolith-typescript.yaml"
```

Bring up the system stack (real + stub) for the chosen architecture:

```bash
gh optivem system start
```

Prepare the test harness (`npm ci` + `playwright install chromium`):

```bash
gh optivem system-test setup
```

Run all latest test suites:

```bash
gh optivem system-test run
```

Run legacy test suites — switch the env var first, then re-run setup (legacy has its own setupCommands block):

```pwsh
$env:GH_OPTIVEM_CONFIG = "gh-optivem-monolith-typescript-legacy.yaml"
gh optivem system-test setup
gh optivem system-test run
```

Run only sample tests (one per suite, fast smoke):

```bash
gh optivem system-test run --sample
```

Run a specific suite by ID:

```bash
gh optivem system-test run --suite acceptance-parallel-api
```

Rebuild container images before bringing the system up:

```bash
gh optivem system build
```

Stop the system when done:

```bash
gh optivem system stop
```

Substitute `gh-optivem-multitier-typescript.yaml` for the multitier architecture.

## Available Suite IDs

| ID | Description |
|----|-------------|
| `smoke-stub` | Smoke tests (stub) |
| `smoke-real` | Smoke tests (real) |
| `acceptance-parallel-api` | Acceptance tests (parallel) - API channel |
| `acceptance-parallel-ui` | Acceptance tests (parallel) - UI channel |
| `acceptance-isolated-api` | Acceptance tests (isolated) - API channel |
| `acceptance-isolated-ui` | Acceptance tests (isolated) - UI channel |
| `contract-stub` | Contract tests (stub) |
| `contract-stub-isolated` | Isolated contract tests (stub) |
| `contract-real` | Contract tests (real) |
| `e2e-api` | E2E tests (real) - API channel |
| `e2e-ui` | E2E tests (real) - UI channel |

You can also pass a **group alias** to `--suite`: `acceptance` runs every acceptance partition, while `acceptance-api` / `acceptance-ui` each run that channel's parallel + isolated partitions together.
