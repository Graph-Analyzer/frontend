# Graph Analyzer - Frontend

The React frontend shows the graph properties and explains their meaning. It additionally implements a first version of a query view, that provides node and edge specific data.

## Run Locally

### API Client

This project uses [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) to interact with the API.

The API client is generated from the OpenAPI specification of the API. If the [API](https://github.com/Graph-Analyzer/api) is running locally, you can regenerate the API client with the following command.

```zsh
npx @rtk-query/codegen-openapi openapi-config-generator.ts
npx @rtk-query/codegen-openapi openapi-config-analyzer.ts
```

#### Limitations

Due to limitations with the automated generation (https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#parsing-a-response), the following has to be changed in the `src/features/api/graphGeneratorApi.ts`:

```ts
        query: (queryArg) => ({
          url: `/convert`,
          method: 'POST',
          body: queryArg.graph,
          params: { file_format: queryArg.fileFormat },
+         responseHandler: 'content-type',
        }),
        invalidatesTags: ['converter'],
      }),
```

### Getting Started with Create Micro-React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the Micro-Frontend template.

> **Note:** Update the Micro-Frontend Id in the _config-overrides.js_ file located in the project root.

    config.output.library = 'YourBrandNewMicrofrontend';

This Id will be required in the Container App to setup the new micro-frontend.

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

#### `npm run lint`

Runs eslint to have a consistent coding convention.

#### `npm run format`

Runs prettier formatter.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

To learn more about the Main SPA, check out the [Main SPA repo](https://github.com/gabrielcerutti/main-spa).

## Authors

- [@lribi](https://github.com/lribi)
- [@pesc](https://github.com/pesc)

## License

This project is licensed under the [MIT](https://github.com/Graph-Analyzer/frontend/blob/main/LICENSE) License.

### Third Party Licenses

Third party licenses can be found in `THIRD-PARTY-LICENSES.txt`.
Regenerate them with this command.

```zsh
npx generate-license-file --input package.json --output THIRD-PARTY-LICENSES.txt --overwrite
```
