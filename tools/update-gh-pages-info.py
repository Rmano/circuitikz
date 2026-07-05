#!/usr/bin/env python3
from pathlib import Path
from datetime import datetime, timezone
import os
import sys

if len(sys.argv) != 2:
    raise SystemExit("usage: update-gh-pages-info.py OUT_DIR")

out_dir = Path(sys.argv[1])
index = out_dir / "index.html"

sha = os.environ.get("GITHUB_SHA", "")
repo = os.environ.get("GITHUB_REPOSITORY", "")
run_id = os.environ.get("GITHUB_RUN_ID", "")
run_number = os.environ.get("GITHUB_RUN_NUMBER", "")

short_sha = sha[:12] if sha else "unknown"
now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")

if repo and sha:
    commit_html = f'<a href="https://github.com/{repo}/commit/{sha}">{short_sha}</a>'
else:
    commit_html = short_sha

if repo and run_id:
    run_html = f'<a href="https://github.com/{repo}/actions/runs/{run_id}">workflow run #{run_number}</a>'
else:
    run_html = "workflow run"

replacement = f'''<!-- CTIKZ_GENERATED_INFO_BEGIN -->
<p><small>
Latest development files generated on {now} from commit {commit_html}
by {run_html}.
</small></p>
<!-- CTIKZ_GENERATED_INFO_END -->'''

text = index.read_text(encoding="utf-8")

begin = "<!-- CTIKZ_GENERATED_INFO_BEGIN -->"
end = "<!-- CTIKZ_GENERATED_INFO_END -->"

start = text.find(begin)
finish = text.find(end)

if start == -1 or finish == -1 or finish < start:
    raise SystemExit("Could not find CTIKZ_GENERATED_INFO marker block in index.html")

finish += len(end)
text = text[:start] + replacement + text[finish:]

index.write_text(text, encoding="utf-8")
print(f"Updated generated-info marker in {index}")

