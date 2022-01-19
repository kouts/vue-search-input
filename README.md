# vue-search-input <a href="https://npm.im/vue-search-input"><img src="https://badgen.net/npm/v/vue-search-input"></a> ![](https://img.badgesize.io/kouts/vue-search-input/main/dist/vue-search-input.umd.js.svg) ![](https://img.badgesize.io/kouts/vue-search-input/main/dist/vue-search-input.umd.js.svg?compression=gzip) ![](coverage/badge.svg)

A Vue.js 3 search input component, inspired by the global search input of Storybook and GitHub.

The `SearchInput` component displays a search input with some additional features built-in.

**Features:**

- Includes a default CSS styling but it's also easy to bring your own styles too.
- Completely customizable via `slots`
- Displays an `x` icon on the right side of the search input, used for **clearing** the text when there's a value typed inside.
- **Focus** on the search input at any time by pressing the `/` key on the keyboard.
- The search text gets cleared by pressing the `esc` key when the search input has focus (configurable).

**_Important:_** It is advisable that you include the `SearchInput` component **only once** on each page.  
 In case multiple `SearchInput` components are present, the first one being displayed will take focus precedence upon the `/` keypress.

## Installation

```bash
npm i vue-search-input
```
