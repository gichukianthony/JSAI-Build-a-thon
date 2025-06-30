# 🌱 Climate Action Assistant

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fyour-username%2Fclimate-action-assistant%2Fmain%2Finfra%2Fazuredeploy.json)

A conversational web application that helps users take meaningful climate action, powered by Azure OpenAI. Get personalized eco-friendly advice, track your progress, and discover practical steps to fight climate change.

## 🌟 Why This Project?

Climate change can feel overwhelming. Many people want to help but don't know where to start or how their individual actions can make a difference. This assistant provides:

- 🌍 Natural conversation interface for climate-related advice
- ♻️ Personalized action plans based on user interests
- 📊 Progress tracking and impact visualization
- 🏆 Achievement system to encourage sustainable habits
- 🔍 Debug and restyle features for customization

## 🚀 Quick Start

### Prerequisites
- Node.js LTS (v16+)
- Azure subscription
- Azure OpenAI Service deployed

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/climate-action-assistant.git
   cd climate-action-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the `backend` directory with your Azure OpenAI credentials:
   ```
   AZURE_OPENAI_ENDPOINT=your-endpoint-url
   AZURE_OPENAI_API_KEY=your-api-key
   AZURE_OPENAI_DEPLOYMENT=your-deployment-name
   AZURE_OPENAI_API_VERSION=2023-07-01-preview
   AZURE_OPENAI_API_TYPE=azure
   ```

4. **Start the development server**
   ```bash
   # Start frontend
   npm start
   
   # In a separate terminal, start the backend
   cd backend
   npm install
   node server.js
   ```

5. **Open in browser**
   Visit `http://localhost:8000` to see the application in action.

## 🛠️ Features

- **Climate-Focused Chat**
  - Get personalized advice on reducing your carbon footprint
  - Learn about sustainable practices
  - Get answers to climate-related questions

- **Progress Tracking**
  - Track your eco-friendly actions
  - Visualize your impact over time
  - Earn badges for sustainable habits

- **Customization**
  - Adjust the UI theme to match your brand
  - Modify prompts and responses
  - Add new climate action categories

## 🚀 Deployment

### Deploy to Azure

1. **Using Azure Developer CLI (azd)**
   ```bash
   # Install Azure Developer CLI
   winget install -e --id Microsoft.Azure.Developer.Cli
   
   # Initialize and deploy
   azd up
   ```

2. **Manual Deployment**
   - Deploy the frontend to Azure Static Web Apps
   - Deploy the backend to Azure App Service or Azure Functions
   - Configure CORS and environment variables

## 🛠 Customization

### Update Branding
- **Logo**: Replace `src/svg/branding/brand-logo.svg`
- **Colors**: Modify `src/styles/chat-component.ts`
- **Content**: Update prompts in `src/config/global-config.js`

### Add New Features
1. Create new components in `src/components/`
2. Add new API endpoints in `backend/server.js`
3. Update the UI in `src/chat-component.ts`

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 📚 Resources

- [Azure OpenAI Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Lit Documentation](https://lit.dev/docs/)
- [Azure Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/)

## Features

When opening in Codespaces or Remote Containers, you will have all the dependencies preinstalled. Once the container is ready, run

```sh
npm start
```

The frontend will be running in forwarded port 8000. 

> [!IMPORTANT]
> You will need to follow instructions in [Getting Started](#getting-started), to deploy a backend and connect it to the frontend app.

[Features](#features) • [Gettting Started](#getting-started) • [Guidance](#guidance) • [Resources](#resources) 

## Features

This repo features a classic Chat-GPT-like user interface, including additional capabilities to debug responses, restyle, revisit history and reset the chat.

### Technical Stack

The following technologies are part of the frontend application:

- [Lit](https://lit.dev) and LitElement
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Vite](https://vitejs.dev/guide/) and [Rollup](https://rollupjs.org/introduction/) for local development, bundling and serving
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for code linting and formatting

### Architecture Diagram

The code in this repository represents the frontend application or colored area in the following diagram. It assumes a backend middleware and service deployments are in place. For a full reference, [visit this repo](https://github.com/Azure-Samples/azure-search-openai-javascript/tree/main)

![frontend application chat UI](./docs/assets/architecture.png)

## Demo Video

The following video shows the user interface. Styles are fully configurable!

https://github.com/Azure-Samples/azure-openai-chat-frontend/assets/4014025/a2933baa-bb8d-42b6-ad8e-a8cf052ddbd0


## Getting started


### Running the application

This application is optimized to be opened in a container. The frontend application is configured using a global configuration file. You can enable or disable the default prompts, and configure the default prompt texts, the API endpoint and other settings.

All texts and labels are configurable to match your use case. To customize the texts, please edit the [global config](./src/config/global-config.js) file.

### Local installation

To run the application locally, you must install [Node.js LTS](https://nodejs.org) and make sure you can run `npm` commands from your terminal.

Then you can proceed by following these steps:

Initialize as an [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/overview), running

```bash
azd init -t azure-openai-chat-frontend
```

- To install all npm dependencies, please run `npm install`. This is a npm workspace, so all dependencies will be installed in the root folder.
- To start the local development server, open a new terminal and run `npm run start`. This will start the local development server on port 8000.
- To build the application, open a new terminal and run `npm run build`. This will generate a production build in the `dist` folder.

> [IMPORTANT]
> For the application to be functional, you will need to connect it to a locally running or remotely [deployed backend service](#deploying-the-app-to-azure-static-web-apps), and make sure that the data attribute `data-api-url` is pointing to the correct endpoint.

## Connecting to a deployed backend

The Search API service implements the [HTTP protocol for AI chat apps](https://github.com/Azure-Samples/ai-chat-app-protocol). It can be used with any backend service that implements the same protocol.

| Recommended backend repos | Development environment | 
| -- | -- | 
|Property rental domain with [Node.js](https://github.com/Azure-Samples/azure-search-openai-javascript)|[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/Azure-Samples/azure-search-openai-javascript)<br>Example question: `What is the refund policy`|
|Employee benefits with [Python](https://github.com/Azure-Samples/azure-search-openai-demo)|[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/Azure-Samples/azure-search-openai-demo)<br>Example question: `What is included in my Northwind Health Plus plan that is not in standard?`|
|Employee benefits with [.NET and C#](https://github.com/Azure-Samples/azure-search-openai-demo-csharp)|[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/Azure-Samples/azure-search-openai-demo-csharp)<br>Example question: `What is included in my Northwind Health Plus plan that is not in standard?`|

To connect to a backend, follow these steps:

1. Deploy the backend services as explained in their respective repository readme files, for example following these [steps to deploy the backend](https://github.com/Azure-Samples/azure-search-openai-javascript#deploying-from-scratch).
2. Once the backend service is fully deployed, get the backend URL with `azd env get-values | grep BACKEND_URI`.
3. Deploy the frontend application to Azure as [explained here](#deploying-the-app-to-azure-static-web-apps) or start it locally or in Codespaces.
4. Set the backend URL in this repo, running `azd env set BACKEND_URI <your_backend_url>` that you got in step 2.
5. Depending on whether you want to use the deployed frontend app or the local frontend app:

- If you want to use the deployed frontend app, run `azd up` to redeploy.
- If you want to use the local frontend app on your machine or in Codespaces, run:

  ```sh
  # Export the environment variable.
  # The syntax may be different depending on your shell or if you're using Windows.
  export BACKEND_URI=<your_backend_url>

  # Start the app
  npm start
  ```

> [NOTE]
> You may need to enable CORS in your backend service, by running `azd env set ALLOWED_ORIGIN <your_frontend_url>` then deploy again with `azd up`. 

Get the frontend URL, following this table:

| Environment | URL                                                     |
| ----------- | ------------------------------------------------------- |
| Local       | http://localhost:8000                                   |
| Production  | `azd env get-values \| grep FRONTEND_URI`               |
| Codespace   | `https://<your_codespace_base_url>-8000.app.github.dev` |

## Using this module as a library

If you want to use the module as a library as it is used in [the JavaScript sample](https://github.com/Azure-Samples/azure-search-openai-javascript), set the environment variable `IS_LIB` to true, running `azd env set IS_LIB true`.

## Guidance

### Deploying 

- if you initialized as an [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/overview) template as explained above, you can run:

`azd up` and follow the instructions in the terminal.

- if you cloned or forked, you can also use the [Azure Static Web Apps CLI](https://learn.microsoft.com/azure/static-web-apps/static-web-apps-cli-deploy), by running `swa init && swa deploy`

### Security considerations

If you're deploying this sample to [Azure Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/overview), using the [Azure Developer CLI template](./infra/), please consider enabling user authentication, following [this guide](https://learn.microsoft.com/en-us/azure/static-web-apps/authentication-authorization). 

Authenticating requests to the backend service, will need to be implemented in the backend service solution.

## Resources

- [AI Chat Protocol](https://github.com/microsoft/ai-chat-protocol)

# Deployment Issue: Azure Static Web Apps Region Restrictions

## Problem Statement

While attempting to deploy a static web app (Azure OpenAI Chat Frontend) using Azure Developer CLI (`azd up`), repeated errors were encountered due to Azure region restrictions for new customers and student subscriptions.

## Steps Taken

1. **Initial Attempt:**
   - Tried deploying to `East US 2` (`eastus2`).
   - Error: `Resource 'chatfrontendapp' was disallowed by Azure: The selected region is currently not accepting new customers.`

2. **Alternative US Regions:**
   - Tried `West US 2` (`westus2`) and `Central US` (`centralus`).
   - Same error encountered in all US regions.

3. **Root Cause:**
   - Azure is currently restricting the creation of new Static Web Apps in high-demand regions for new or low-tier (e.g., Azure for Students) subscriptions.
   - This is a platform-wide policy and not specific to the template or codebase.

## Workarounds & Recommendations

- **Try Non-US Regions:**
  - Use regions like `westeurope` (West Europe) or `eastasia` (East Asia), which are less likely to be restricted for new customers.
  - When prompted for location during `azd up`, enter `westeurope` or `eastasia`.

- **If All Regions Are Blocked:**
  - Consider using a paid Azure subscription.
  - Alternatively, deploy the static frontend to another provider (e.g., GitHub Pages, Vercel, Netlify) and use Azure only for backend services.

## Error Message Example

```
RequestDisallowedByAzure: Resource 'chatfrontendapp' was disallowed by Azure: The selected region is currently not accepting new customers: https://aka.ms/locationineligible.
```

## Deployment Decision: nutripal Environment

For this project, I have already deployed the application using the **nutripal** environment in the **westeurope** region. The choice of this region/environment was based on the following considerations:

- **Region Availability:** All attempted US regions (East US 2, West US 2, Central US) were not accepting new customers for Azure Static Web Apps due to Azure's policy for new/student subscriptions.
- **Minimizing Deployment Errors:** To avoid repeated deployment failures, I selected `westeurope` as it was less likely to be restricted for new customers, based on Azure documentation and community feedback.
- **Successful Provisioning:** The `westeurope` region allowed the resources for the nutripal environment to be provisioned successfully, enabling the project to move forward without further delays.

This approach ensured a smooth deployment process and avoided the common pitfalls associated with region restrictions on Azure for new or student accounts.

---

# Azure OpenAI Chat Frontend

# 🛠️ Project Submission: Nutripal – AI-Powered Nutrition Assistant

## The problem you're solving

Many people struggle to make healthy food choices and track their nutrition effectively. **Nutripal** aims to provide personalized, AI-powered nutrition advice and meal planning, making it easier for users to achieve their health goals.

## Why you picked the template

I chose the **Azure OpenAI Chat Frontend** template because it provides a robust, conversational UI out of the box, is easy to customize, and integrates seamlessly with Azure OpenAI services. This allowed me to focus on building unique nutrition features rather than starting from scratch.

## What customizations you made

- **Frontend Tweaks:**
  - Updated the UI to reflect the Nutripal brand and nutrition-focused user flows.
  - Added new components for meal suggestions, nutrition tips, and progress tracking.
  - Enhanced the chat interface to support nutrition-specific queries and responses.

- **Backend Updates:**
  - Integrated external nutrition data APIs to provide real-time food and calorie information.
  - Customized prompt engineering to deliver tailored nutrition advice.
  - Improved backend logic to support user-specific meal planning and dietary restrictions.

- **Model Changes:**
  - Switched to a model optimized for health and nutrition Q&A.
  - Fine-tuned prompts for more accurate and actionable nutrition guidance.

- **Other Enhancements:**
  - Added user authentication for personalized recommendations.
  - Improved error handling and user feedback mechanisms.

## How to run the project

See the included `README.md` for setup instructions, deployment steps, and usage examples.
