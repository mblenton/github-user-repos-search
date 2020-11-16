Task:

Create React application using TypeScript that connects to the GitHub API.
Application needs to have:
1. GitHub repository search
2. Profile page
3. Repository list
User has to be able to search for a particular GitHub account name, and if there is
a match application has to display:
• User profile (profile picture, username and email, link to GitHub profile)
• Repository list (full repo name and repo description, link to GitHub repo)
User has to be able to sort repositories by name.
User repositories should be cached in order to assure immediate access of user
data if the same search is executed.
Component and application styling is required.
Your solution will be evaluated on the following:
• Code quality
• Code architecture and organisation
• Git workflow
• UI/UX
• Does the solution work?
Rules:
• It must be clearly noted if there are parts of the code you have not
written yourself.
• You can use a boilerplate to speed up your development, but you
have to explain parts of the boilerplate if asked. Try to avoid
createreact-app, because it abstracts too much from the solution.

# github-user-repos-search
Demo React app: searching github repos by username.
Config app variables are located in .env file in root.

## Install

Install with npm:

```bash
npm install
```

Install with yarn:

```bash
yarn install
```

## Run

Development:

```bash
yarn run dev
```

Build:

```bash
yarn run build
```

Build version with server:

```bash
yarn run build-server
```
