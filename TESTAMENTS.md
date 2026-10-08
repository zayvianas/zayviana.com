# Testaments: how to write and post one

Testaments are Zayviana's newsletter-style posts on zayviana.com/testaments. Each one should be a good, informative read that takes about 5 to 10 minutes (roughly 1,100 to 2,200 words). Every post gets a Listen button automatically, using the reader's own phone or browser voice.

## The easy way (no code)

1. Write the post in a Google Doc using the template below.
2. Send the doc to Kisha and say "post this Testament."
3. Kisha adds it as a draft, sends you a preview link, and publishes it once you say it's good.

## Template

```
Title:     Short and specific. 3 to 8 words.
Summary:   One sentence that makes someone want to read it.
Tags:      1 to 3 of: Faith, Business, AI, Tech, PM, Learning, Money, Life
Date:      The day it goes live.

Opening (1 to 2 short paragraphs)
  Start with a moment, a question, or something you noticed.
  Tell the reader why this matters to them.

Section 1 heading
  2 to 4 paragraphs. One idea per section.

Section 2 heading
  2 to 4 paragraphs. A story or example works well here.

Section 3 heading (optional)
  2 to 4 paragraphs.

Takeaway
  What should the reader do, think about, or remember?
  A short list of 3 to 5 points is fine here.

Closing
  A scripture, a question to sit with, or one honest line.
  End with an invitation to reply.
```

## Writing tips

- Write like you talk. Contractions, short sentences mixed with longer ones, no buzzwords, no em dashes.
- One big idea per post. If there are two, that's two posts.
- Headings every few paragraphs make it easy to skim and easy to listen to.
- Faith can show up in any post. It doesn't need to be labeled.

## Posting it yourself (for whoever helps run the site)

Posts live in `app/testaments/posts.ts`. Copy an existing post object and fill in:

| Field | What it is |
|---|---|
| `slug` | The web address, lowercase with dashes: `why-i-build-faith-first` |
| `title`, `summary` | From the template |
| `date` | `YYYY-MM-DD` |
| `tags` | From the tag list above |
| `published` | `false` while drafting (shows only on preview links), `true` to go live |
| `body` | A list of blocks: `{ type: "p", text }`, `{ type: "h2", text }`, `{ type: "quote", text, cite }`, `{ type: "list", items: [...] }` |

Open a pull request, check the Vercel preview, then merge.
