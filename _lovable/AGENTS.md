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

- Keep funnel screens in route-independent components and advance through React context state, not router navigation, so the entry URL stays unchanged; legacy routes initialize the matching screen.
- Keep final-offer plan data in a browser-safe module shared by the screen and tests; do not simulate successful payments when checkout is not connected.
