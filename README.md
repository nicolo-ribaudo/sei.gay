# [sei.gay](https://sei.gay/en)

> Your crush is straight and you need to invite them to be gay? You friend just came out as bi and you want to congratulate them? [sei.gay](https://sei.gay/en) is exactly what you are looking for!

- Italian version: [sei.gay/it](https://sei.gay/it)
- English version: [sei.gay/en](https://sei.gay/en)
- German version: [sei.gay/de](https://sei.gay/de)
- Dutch version: [sei.gay/nl](https://sei.gay/nl)
- Portuguese version: [sei.gay/pt](https://sei.gay/pt)

## Contributing

To develop locally, install [Deno](https://deno.land/) and run
```
deno run --allow-net --allow-read --watch server/main.ts
```

PRs are welcome!

#### Translating

- Add your translation to `./server/strings.ts`
- Update the `pathname` checks in `./server/main.ts` (search for `/en`).

#### Adding more flags

- You can add a gradient in `./scripts/build-gradient-45deg-square.js`, and run `deno run ./scripts/build-gradient-45deg-square.js` to generate the corresponding CSS. Gradients must start and end with the same color, and they must have a color specified for the 50% point (this is needed to make them look good when rotated by 45 degrees and repeated).
- You can add aliases in `./server/dictionary.ts`.
