<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep TanStack Start as the application framework; this workspace cannot be converted to Next.js.
- Centralize portfolio identity and sample content in a browser-safe data module so real details can replace placeholders without changing presentation.
- Load the Three.js scene lazily after hydration and provide a non-WebGL fallback so SSR and unsupported devices remain usable.
- Keep portfolio colors and visual styles in the global design system so the scroll journey and interaction states stay consistent.
