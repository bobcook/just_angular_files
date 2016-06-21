## Setup

# make sure your installed node version matches package.json's engines.node
$ npm install # if encountering errors, try running twice
```

## Local Development
you will need all these processes running for local development:

1. `$ cd client && gulp serve`

To run the tests;
 $ cd client
 $ gulp test

## Frontend

The frontend application is an Angular app located in the `client/` directory. The app is built with Gulp and structured for deployment to AWS S3 + Cloudfront. To set up the frontend application, run `npm install` in the root directory, which will install Node and Bower dependencies and build the client code.

There are a variety of Gulp tasks for development purposes. All the Gulp tasks should be run in the `client/` directory. To run a server that watches for changes, run `gulp serve`.

To deploy to AWS, use `gulp deploy`. See the section on [Deployment Configuration]() for more details.

## Backend

The backend is a Rails API structured for deployment on Heroku.

### Build dependencies

We use gulp to build our frontend app. This leverages the npm ecosystem, which can be somewhat unreliable.

To ensure that everyone gets the same npm dependencies, we have included a `npm-shrinkwrap.json` to lock
versions.

When adding or updating build dependencies, do the following:

1. "npm install" in the package root to make sure you have current versions of all dependencies.
1. "npm install --save <PACKAGE NAME>" to save a new package, if necessary
1. Validate that the package works as expected with the new dependencies.
1. Run "npm shrinkwrap --dev", and commit the new npm-shrinkwrap.json.

See https://nodejs.org/en/blog/npm/managing-node-js-dependencies-with-shrinkwrap for a more in-depth
explanation of npm shrinkwrap.

## Definition of Done

In addition to satisfying acceptance criteria, new functionality/changes/etc
must meet the following requirements before they can be considered "done":

1. Be well-tested according to our
   [Automated Testing Policy](#automated-testing-policy), and the test suite
   must be passing.
1. [Conform to the Ruby Community Styleguide.](#styleguide-enforcement)
1. Update the seed file with any new data that QA will need to accept your feature
1. Ensure that any new ENV vars are added to `setup.rb` and updated on CI and
   servers
1. Views render correctly in all [supported browsers](#supported-browsers)
1. Have received the :shipit: in peer review via Pull Request.

## Automated Testing Policy

TODO: Add your team's agreed upon policy here.

## Styleguide Enforcement

We run [rubocop][rubocop] with near vanilla configs to enforce the Ruby Community
Styleguide. It runs as part of the default `$ rake` task on CI or can be run on
its own with `$ rubocop`.

[rubocop]: https://github.com/bbatsov/rubocop


## Deployment Procedure

###### Deploying

To clean before building and deployment:

```sh
$ gulp clean
```

To build and deploy:

```sh
$  gulp deploy:awseb --env <ENVIRONMENT>
```
