# Atlan Senior Developer Frontend Challenge

## App
This app is developed incrementally. Each iteration should have a deployed build on Netlify. The most recent build can be accessed on this link.

[https://atlan-adrian-frontend-challenge.netlify.app/](https://atlan-adrian-frontend-challenge.netlify.app/)

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```


## UI Components
Each components in each directory should at least consists of these files:
- `index.js`

  This serves as the entrypoint for each component. Only named export is exposed to enforce component naming on import.

- `\<name>.vue`

  This consists only of the template and script block.

- `\<name>.scss`

  All style definitions goes here.

## Mock Data
As mentioned within the challenge description, the data used for mocks in this app comes from this [link](https://github.com/graphql-compose/graphql-compose-examples/tree/master/examples/northwind/data/csv). Any CSV that contains binary data is filtered out.

CSV is then viewed and treated as table, as in RDBMS table.

### CSV to JSON
Instead of converting CSV to JSON manually, this app utilize webpack loader to convert CSV to JSON at build time.

### Unit Test (Jest)
Mock data fetching is simulated as network request, instead of requiring them directly. This is meant to anticipate future use case, in which an actual network request might be required.

Unit test is then written to test that each request correctly returns the desired results.
