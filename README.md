# FE-Engineer Website

This is an open-source code base used to power the website for FE-Engineer on youtube.  [Visit FE-Engineer Website here](https://fe-engineer.com).  This code is provided as-is, and there is no guarantees that it will be updated or maintained.

## What does it do?

This code-base is meant to power a youtube creators website, allowing for a creator to have a website that pulls up to date youtube videos and details regularly.  This is a work-in-progress and a good bit of work is still left to do.

## How do I use it?

Install Node
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Install Pnpm package manager

```
npm install -g pnpm
```

Clone this repo:
```
git clone https://github.com/FE-Engineer-Youtube/fe-engineer-website.git
```

Install dependencies
```
pnpm i
```

Run Develop
```
pnpm dev
```

Deploy using PM2
```
pnpm start-cluster
```

## What is needed to use this as it is?

To use this code, you will need a youtube API key, a firebase project all setup with the required firebase credentials.  You can see the env.sample file to see the required variables to run this exactly as it works at [FE-Engineer Website](https://fe-engineer.com).

## Helpful Links

Framework - [Remix](https://remix.run/)
Component Library - [Mantine Documentation](https://mantine.dev/guides/remix/)
Youtube API Key - [Google Cloud Console](https://console.cloud.google.com/)
Authentication - [Google Firebase](https://console.firebase.google.com/)
Analytics - [Google Analytics](https://analytics.google.com/)