# Easy Encyclopedia

A Hugo-based semantic encyclopedia for structured, YAML-driven educational content.

## Architecture

The source of truth is `content/concepts/*.yaml`. Hugo does not own the article data; it only renders it. During each build, `content/concepts/_content.gotmpl` reads every YAML concept object, unmarshals it, and calls Hugo's content adapter API to create one article page per concept.

This keeps the repository friendly to AI-assisted content generation: adding or editing an article means changing one YAML object, not hand-writing a Markdown page.

## Why This Shape

- `content/concepts/*.yaml` stores canonical concept objects close to the generated route they represent.
- `content/concepts/_content.gotmpl` is the only translation layer from data to Hugo pages.
- `layouts/concept/single.html` renders a concept object without hardcoding specific articles.
- `data/generated/graph.json` is reserved for derived semantic graph data.
- `static/images` and `static/audio` hold local media, while concept YAML can also reference external assets.
- `.github/workflows/pages.yml` builds and deploys the static site to GitHub Pages on every push to `main`.

## Local Development

Install Hugo `0.161.1` or newer, then run:

```bash
hugo server
```

Build the production site with:

```bash
hugo --minify --printPathWarnings
```

## Adding a Concept

Create a new YAML file in `content/concepts`, for example:

```text
content/concepts/photosynthesis.yaml
```

Use a stable `slug`, a stable `id`, localized title fields, summaries, quiz objects, relationships, podcast IDs, and image references. The next Hugo build automatically creates the article page.

## Future Extensions

- Generate `data/generated/graph.json` from `relationships`.
- Add client-side graph visualization using lightweight JavaScript.
- Export quiz and cloze data for spaced repetition.
- Generate podcast feeds from `podcasts` IDs.
- Add bilingual routes or app-facing JSON outputs without changing article authoring.

