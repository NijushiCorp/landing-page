# Nijushi Corp. — Design Notes

Reference for anyone editing the landing page. Build to these rules; don't
reintroduce the patterns listed under "Retired".

## Palette

Cream page ground with white raised surfaces and one orange accent. Navy is
the only dark tone and is used for exactly one thing: the inverted band.

| Token | Value | Role |
| --- | --- | --- |
| `--background` | `#F7F3EA` | Page ground (cream) |
| `--surface` | `#FFFFFF` | Raised content surface |
| `--surface-tint` | `#F0EBDF` | Deeper cream band, separates sections |
| `--surface-navy` | `#1A1F4D` | Inverted band (CTA, footer) |
| `--accent` | `#EC5E27` | The brand orange |
| `--accent-strong` | `#C94812` | Accent hover/press only |
| `--border` | `#E5DFD5` | Hairlines |

**Accent rule.** `--accent` and `--accent-strong` are the only oranges. Never
write `orange-500`, `orange-600`, or a raw hex in a component — those drift
from the token and are the reason the old page looked patchy.

**Hover rule.** Hover changes *colour*, not opacity, and not position. The old
`hover:opacity-90` made buttons look like they were fading out; `hover:scale`
plus `hover:-translate-y` plus `hover:shadow-lg` plus `group-hover:rotate`
stacked four motions onto one interaction.

## Surfaces and rhythm

Sections alternate tone instead of being separated by a divider element. That
is the whole reason the page now flows: `bg-surface-tint` on one section and
`bg-background` on the next reads as a boundary, so the eight
`<div className="border-t border-border" />` elements are gone.

Tone sequence on the home page:

```
Hero        background (cream)   + one bottom hairline
Features    surface-tint
Social      background
CTA band    surface-tint  ->  navy card
Footer      surface-navy
```

## Spacing

Only scale values. `py-15`, `py-13`, and `pt-30` are not on the scale and are
not used. Rhythm comes from `Section`:

- `sm` — `py-12 sm:py-14`
- `base` — `py-16 sm:py-20 lg:py-24`
- `lg` — `py-20 sm:py-28 lg:py-32`

Container is `max-w-6xl` with `px-4 sm:px-6 lg:px-8` everywhere. One width, one
gutter.

## Primitives

- `components/ui/section.tsx` — tone + size. Pass `container={false}` when the
  section lays itself out.
- `components/ui/section-heading.tsx` — `center` / `left` / `split`. Vary this
  between consecutive sections; the old page used the identical centred
  template for every section, which is why it read as a stack rather than a
  page.
- `components/ui/card.tsx` — `flat` (default) and `raised`. Shadow means
  elevation, so a shadow must have a reason. One raised card per view, max.

## Radius

Controls use `rounded-lg`. The radius scale derives from `--radius` and is
exposed as `--radius-card`. `rounded-full` is for status dots and avatars only,
never buttons or cards.

## Motion and accessibility

- Transitions are colour/transform at `duration-200`, not 300ms everywhere.
- The scroll arrow no longer bounces forever; it nudges on hover.
- `prefers-reduced-motion` is honoured for smooth scrolling, and the
  `motion-reduce:` variant is used where animation is decorative.
- Interactive elements carry `focus-visible:ring-2` with a matching
  `ring-offset`. Keyboard nav must stay visible against navy and cream alike.

## Retired patterns

Do not reintroduce these:

- Pill + `backdrop-blur` + `shadow-lg` header triple. The header is a flat bar
  with a single hairline that appears on scroll.
- `<div className="border-t border-border" />` between sections.
- Identical centred heading on every section.
- `shadow-sm` on every card.
- Stacked hover animations (opacity + scale + translate + rotate + shadow).
- Invalid nesting: `<button><a>` was invalid HTML and is now an `<a>`.
- Raw `orange-*` utilities.
- Two stacked `<footer>` elements; there is one.
