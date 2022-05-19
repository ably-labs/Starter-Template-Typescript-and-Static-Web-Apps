# Ably + Azure Static Web App.

A GitHub template to quickly get started with Ably, hosted on Azure Static Web Apps (+built in Azure Functions), TypeScript and Jest.

Contents:

- What is this?
- Usage
- Getting and Managing Ably API keys
- Deployment
- Dev Containers
- Credits

# What is this?

This is a GitHub template repository that will create you a pre-configured, v-latest experience on Azure Static Web Apps, along with a hot-reload enabled, local development experience. We've configured Jest, TypeScript, ts-jest, and a bunch of default built jobs so you can create a new repository and just get to work.

There's a built in hot-reloading dev experience powered by Vite.js.

It's built out-of-the-box to support Ably realtime, and has pre-build APIs for the Ably JavaScript SDK to handle authentication and messaging.

Bundled tools:

- Vite (vite.dev) - hot reload, bundleless dev server
- TypeScript - language, type checking
- Jest (and ts-jest) - test runner
- Azure Functions - bundled API / BFF support.
- Ably - realtime, auth, messaging

# Usage

- Create a repository based on this repository.
- Clone your new repository.
- Run `npm install` to install the dependencies.
- Run `npm run start` to start the local development server.
- Browser to `http://localhost:8080`

You'll see a white page load, which in turn will load the Ably JavaScript SDK, and use the included Azure functions to handle API key management.When everything is running, you'll see Ably messages written to the page.

You can run tests on the CLI:

```bash
npm run test
```

Or with a VS Code plugin like `Wallaby.js`.

# Getting and Managing Ably API keys

In order to run this app, you will need an Ably API key. If you are not already signed up, you can [sign up now for a free Ably account](https://www.ably.io/signup). Once you have an Ably account:

1. Log into your app dashboard.
2. Under **“Your apps”**, click on **“Manage app”** for any app you wish to use for this tutorial, or create a new one with the “Create New App” button.
3. Click on the **“API Keys”** tab.
4. Copy the secret **“API Key”** value from your Root key, we will use this to configure our app.

This app is going to use [Ably Channels](https://www.ably.io/channels) and [Token Authentication](https://www.ably.io/documentation/rest/authentication/#token-authentication).

## Configuring your Ably API keys

### For local development

You need to create a `.env` file in `./api` to with a variable defined called `ABLY_API_KEY` to store your secret.
You can do this from the command line if you like:

```bash
cd api
echo ABLY_API_KEY=YOUR-API-KEY-HERE > .env
```

\*You need to restart the dev server after you create this `.env` file.

### Once deployed to Azure

Azure Static Web Apps uses the Azure Portals `AppSettings` application configuration to store the API key.
You need to navigate to your settings, and create a new setting with the key `ABLY_API_KEY` and a value of your key.

If you need to use another kind of secrets store, you'll have to implement that yourself by editing `./api/ably-token-request` and modifying the code the loads the key from `process.env.ABLY_API_KEY`.

# Deployment

When you use the Azure portal to create a new Static Web Application, select custom, and use the following configuration values:

```javascript
    app_location: "/"
    api_location: "api"
    output_location: "dist"
```

You can either enter these in the Azure Portal UI, or you can edit the GitHub build .yml file that gets created in `.github` afterwards if you missed this.

# Dev Containers

This repository contains pre-configured `.devcontainer` support, so you can use it to spin up either VS Code devcontainers, or a GitHub Codespace for your application. It should just work!
