# Shop canonical DB migrations

Single ordered Flyway migration set, applied by a `db-migrate` sidecar before any app starts. All six SUT implementations (3 languages × 2 architectures) read this schema rather than creating their own.

## Conventions

- **Naming:** `V{YYYYMMDDHHMMSS}__{description}.sql` — timestamped to avoid merge conflicts between parallel branches.
- **Forward-only:** no `U__*.sql` undo files. `FLYWAY_CLEAN_DISABLED=true` on the sidecar. Recovery from a bad migration is a new forward migration.
- **Rollback-safe:** every migration must preserve the previous app version's invariants (expand → migrate → contract).

## Runbook

See [`shop/CONTRIBUTING.md`](../../CONTRIBUTING.md#schema-changes) for the forward-only doctrine, expand-contract worked examples, and the rollback-safety table.

## Background

See the gh-optivem plan [`plans/20260513-1530-shop-canonical-db-schema-via-migrations.md`](https://github.com/optivem/gh-optivem/blob/main/plans/20260513-1530-shop-canonical-db-schema-via-migrations.md) for the design and decision log.
