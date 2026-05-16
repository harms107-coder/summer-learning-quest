# Word Quest Summer

An installable learning practice web app for iPad. It has spelling games, a separate Math Facts mode, a tap-based early learning track for Thurston, 100-point sessions, review loops, and per-player progress saved on the device.

The starter profiles are Winslow, Beck, and Thurston. Spelling sessions run until the player reaches 100 points. Skipped or missed items return in review, and shaky spelling words return for extra practice. Math Facts has its own grade tracks, levels, practice modes, mistake bank, XP, stars, and parent progress view.

Profile photos and reward-track markers live in `assets/`. If a browser cannot decode a profile image, it shows the profile initial instead.

## Progress And Reset

Progress is saved on the device. A session is saved after the 100-point goal is reached.

- Use `Start current session over` during a session to reset the active run.
- Use `Reset [name]` on the quest map to clear one child's full run.

If a word is missed twice, the app reveals it and asks the child to copy it correctly once before moving on. No points are awarded for that word, and it is listed for practice at the end.

## Try It Locally

The app is plain HTML, CSS, and JavaScript. From this folder, run a local web server and open the shown URL in a browser.

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173
```

## Install On iPad

For a real iPad home-screen install, host this folder somewhere reachable over HTTPS, such as GitHub Pages, Netlify, Vercel, or a small home server with HTTPS.

On the iPad:

1. Open the hosted app URL in Safari.
2. Tap Share.
3. Tap Add to Home Screen.
4. Launch Word Quest from the iPad home screen.

## Deploy Anywhere

Upload `word-quest-summer-deploy.zip` to a static host such as Netlify, Cloudflare Pages, Vercel, or GitHub Pages. Netlify's drag-and-drop deploy is the quickest: no unzip required, just drop the zip into Netlify's deploy area.

After deploy, open the hosted URL on each tablet or phone and use Add to Home Screen. Future updates work by replacing the deployed files with a new zip. Each device keeps its own progress locally unless a sync backend is added later.

## Math Facts Mode

Use the mode switch on a player's quest map to choose `Spelling Games` or `Math Facts`. Math has separate 2nd Grade Math and 5th Grade Math tracks, level cards, and practice modes:

- Daily Mixed 10
- No Timer
- Streak Mode
- Flash Round
- Boss Facts

Math progress tracks correct answers, missed facts, response time, streaks, mastered facts, facts needing review, total minutes, XP, and stars.

## Editing The Word Lists

The starter words live in `word-lists.js`. Winslow and Beck have separate spelling lists. Thurston's dot-counting, number addition, pattern, shape/color listening, and first-word activities live in `app.js`. Each session runs until the player reaches 100 points.

Winslow's list is based on the ABCmouse spelling word categories. Beck's list is based on the supplied K12Reader spelling list PDF.

Custom clues can be added in the `CLUES` object in `app.js`. Words without a custom clue use `generated-clues.js` when available, then fall back to a simple spelling-pattern hint.
