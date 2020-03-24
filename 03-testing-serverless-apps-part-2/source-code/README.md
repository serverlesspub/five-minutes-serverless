# AWS Serverless Application Model TypeScript template

A simple AWS SAM template with TypeScript.

## Folder structure

This project has the following folder structure:

```bash
.
├── README.md # This file
├── build # Build folder
│   └── hello-world # Each function has its own folder
│       ├── lambda.js
│       └── lambda.js.map # And each function has sourcemaps
├── jest.config.js # Jest configuration
├── package.json
├── src # Source code for all functions
│   └── hello-world # Sample function
│       ├── events # Sample event for local invocationn
│       │   └── event.json
│       ├── lambda.ts # Main file
│       ├── lib # Rest of code, including function business logic
│       │   └── main.ts
│       └── tests # Tests for business logic and all important files
│           └── main.test.ts
├── template.yaml # Main CloudFormation file 
├── webpack.config.js # Webpack config
├── yarn.lock
└── .eslintrc.js # ESLint config
```

## Usage

To use this template, make sure you have the following prerequisites:

- AWS profile
- AWS SAM installed and configured
- Node.js version 8 or more (version 12 is recommended)

### Initialize a new project

To create a new project using this template, create a new folder, navigate to your new folder in your terminal, and run the following command:

```bash
sam init --location gh:serverlesspub/sam-ts
```

This will create a new AWS SAM project with the folder structure explained above.

### Build TypeScript

To build TypeScript, run the following command:

```bash
npm run build
```

If you want to build a project and run the webpack bundle analyzer, run the following command:

```bash
npm run build-analyze
```

### Deploy

To deploy the project, run the following command:

```bash
sam deploy --guided
```

This will run an interactive deployment process, save your configuration to the `samconfig.toml` file, and deploy the project to your AWS account.

_NOTE: The `samconfig.toml` file is on git ignore list._

### Run automated tests

To run Jest tests, use the following command:

```bash
npm run test
```

This command will run ESLint, and if there are no linting issues, it'll run Jest tests.

If you want to run ESLint without tests, use the following command:

```bash
npm run lint
```

### Test and debug using SAM Local

TBA

## License

MIT, see [LICENSE](LICENSE).