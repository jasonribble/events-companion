#!/usr/bin/env bash
# Runs SonarScanner analysis on the TypeScript system tests.
#
# Local helper that pushes a SonarCloud analysis using your personal token.
# CI runs the same analysis (auto-retried in CI via optivem/actions) from monolith-typescript-acceptance-stage.yml and
# multitier-typescript-acceptance-stage.yml after tests finish; this script
# is for manual runs.
# Get token: https://sonarcloud.io/account/security
#
# Usage: ./run-sonar.sh [TOKEN]
#        SONAR_TOKEN=<t> ./run-sonar.sh

set -euo pipefail

TOKEN="${1:-${SONAR_TOKEN:-}}"
if [ -z "$TOKEN" ]; then
  echo "ERROR: Sonar token required. Set SONAR_TOKEN env var or pass as first arg." >&2
  echo "Get token: https://sonarcloud.io/account/security" >&2
  exit 1
fi

echo "Running SonarScanner for TypeScript system tests..."

npx -y sonarqube-scanner \
    "-Dsonar.projectKey=jasonribble_events-companion-system-test" \
    "-Dsonar.projectName=events-companion-system-test" \
    "-Dsonar.organization=jasonribble" \
    "-Dsonar.host.url=https://sonarcloud.io" \
    "-Dsonar.token=$TOKEN" \
    "-Dsonar.sources=src,tests"

echo "Sonar analysis complete."
