#!/usr/bin/env bash
set -e

PROJECT_DIR="$HOME/suksuk_picker"
PORT=8000

cd "$PROJECT_DIR"

if ss -ltn "( sport = :$PORT )" | grep -q ":$PORT"; then
  echo "http.server already running on port $PORT"
else
  echo "Starting http.server on port $PORT..."
  python3 -m http.server "$PORT" >/tmp/suksuk_picker_http.log 2>&1 &
  sleep 2
fi

cmd.exe /C start "" "http://localhost:$PORT/index.html"
sleep 1
cmd.exe /C start "" "http://localhost:$PORT/control.html"

echo "Opened:"
echo "  http://localhost:$PORT/index.html"
echo "  http://localhost:$PORT/control.html"
echo
echo "Server log: /tmp/suksuk_picker_http.log"
