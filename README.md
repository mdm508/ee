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
- `static/audio` holds local audio files, while concept YAML embeds external article images by URL.
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

## Concept Schema

Use one YAML file per concept. The filename should match the slug:

```text
content/concepts/a-priori.yaml
```

The `slug` is the canonical permanent identifier. Slugs must be unique and use lowercase words separated by dashes. Links are flat semantic concept links. Podcasts are separate semantic objects referenced by slug.

```yaml
slug:

title:
  english:
  chinese_traditional:
  zhuyin:

pronunciation:
  ipa:
  readable:

origin:
  language:
  meaning:

summary:
plain_english:
memory_hook:

background:
  - >

location:
  -

dates:
  - year:
    event:

cause_effect:
  - cause:
    effect:

technical:

compare:
  - concept:
    difference:

examples:
  - >

mistakes:
  - >

quiz:
  questions:
    - type: qa
      prompt:
      answer:
    - type: cloze
      text: >

compression:
  chinese:
  answer:
  english:

links:
  -

podcasts:
  -

images:
  - url:
    caption:
```

Question rules:

- QA questions must be full natural-language questions ending with question marks.
- QA questions must include answers.
- Cloze questions must test different facts from QA questions.
- Clozes use bracket syntax, for example `[word]`.
- Clozes should usually hide only one important word.

Rendering rules:

- Links render as semantic concept navigation.
- Images render as external embedded image galleries.
- Podcasts render as linked podcast references.
- The graph structure itself acts as the glossary/navigation layer.

The next Hugo build automatically creates or updates the article page.

## Future Extensions

- Generate `data/generated/graph.json` from `links`.
- Add client-side graph visualization using lightweight JavaScript.
- Export quiz and cloze data for spaced repetition.
- Generate podcast feeds from `podcasts` IDs.
- Add bilingual routes or app-facing JSON outputs without changing article authoring.
