# [sei.gay](https://sei.gay/en)

> Your crush is straight and you need to invite them to be gay? You friend just came out as bi and you want to congratulate them? [sei.gay](https://sei.gay/en) is exactly what you are looking for!

- Dutch version: [sei.gay/nl](https://sei.gay/nl)
- English version: [sei.gay/en](https://sei.gay/en)
- German version: [sei.gay/de](https://sei.gay/de)
- Italian version: [sei.gay/it](https://sei.gay/it)
- Portuguese version: [sei.gay/pt](https://sei.gay/pt)
- Spanish version: [sei.gay/es](https://sei.gay/es)
- Turkish version: [sei.gay/tr](https://sei.gay/tr)

## Contributing

To develop locally, install [Deno](https://deno.land/) and run
```
deno task serve
```

PRs are welcome!

#### Translating

- Add your translation to `./server/strings.ts`

#### Adding more flags

- You can add a gradient in `./scripts/build-gradient-45deg-square.js`, and run `deno run ./scripts/build-gradient-45deg-square.js` to generate the corresponding CSS. Gradients must start and end with the same color, and they must have a color specified for the 50% point (this is needed to make them look good when rotated by 45 degrees and repeated).
- You can add aliases in `./server/dictionary.ts`.
