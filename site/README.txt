Open via a local server, not by double-clicking the .html files (the pages load each other with fetch, which browsers block on file://).
Mac: double-click "Start preview.command" (needs python3), then use the index page.
Any OS: in this folder run  python3 -m http.server 8000  and open http://localhost:8000/index.html
Needs internet (React is loaded from unpkg).
