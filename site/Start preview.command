#!/bin/bash
# Double-click to preview the mockups at http://localhost:8000 (pages must be served over http, not opened from disk)
cd "$(dirname "$0")"
(sleep 1; open "http://localhost:8000/index.html") &
python3 -m http.server 8000
