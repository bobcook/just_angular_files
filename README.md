# AARP Staying Sharp

[ ![Codeship Status for philosophie/aarp-staying-sharp](https://codeship.com/projects/5ea238d0-28c4-0133-e286-1ecec8ed5cc2/status?branch=master)](https://codeship.com/projects/97822)
[![Code Climate](https://codeclimate.com/repos/55d4c46de30ba0228b00a9c3/badges/9ddd857d2dd0872bb1a7/gpa.svg)](https://codeclimate.com/repos/55d4c46de30ba0228b00a9c3/feed)

## Setup

```bash
$ bundle
$ bundle exec rake newb
$ nvm use
$ npm install
```

### Install Elasticsearch
```bash
$ brew install elasticsearch
```

### Import AARP CMS content. The content will automatically be added to Elasticsearch.

```bash
$ bundle exec sidekiq -q default -q mailers
$ bin/rake content_feeds:import
```

### If you already have CMS content, but need to add the content to elasticsearch.

```bash
$ bin/rake elasticsearch:index
```

## Local Development
you will need all these processes running for local development:

1. `$ bundle exec rails s`
1. `$ bundle exec sidekiq -q default -q mailers`
1. `$ cd client && gulp serve`
1. `$ elasticsearch` <= only needed if not running as a daemon

### Development Environment Variables
Do not set the `DSO_MAIL_API` to the actual endpoint in development to prevent
sending emails.

## Frontend

The frontend application is an Angular app located in the `client/` directory. The app is built with Gulp and structured for deployment to AWS S3 + Cloudfront. To set up the frontend application, run `npm install` in the root directory, which will install Node and Bower dependencies and build the client code.

There are a variety of Gulp tasks for development purposes. All the Gulp tasks should be run in the `client/` directory. To run a server that watches for changes, run `gulp serve`.

To deploy to AWS, use `gulp deploy`. See the section on [Deployment Configuration]() for more details.

## Backend

The backend is a Rails API structured for deployment on Heroku.

### Authentication

In order for the frontend to be able to authenticate with AARP, the backend serves as a proxy that manages all third-party authentication itself, then returns a JWT to the client. When the user attempts to log in, they navigate to a remote URL on the backend, which redirects them to the AARP login flow. Once they've logged in, then they're returned to the backend, along with the auth token.

The auth token itself is encoded into a JWT, but the JWT is too long to fit in a URL query parameter, so it can't be directly sent back to the Angular app. Instead, a temporary "claim token" is generated, which is just a random string, which *itself* is passed as a query parameter to the Angular app. The frontend then makes an API call back to the backend to retrieve the actual JWT, and the temporary claim token is destroyed. The temporary tokens expire after one hour, and the JWTs expire after 24 hours.

## ThirdParty Dependencies

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

### Azul7 Frontend Components

Azul7 has provided a majority of the frontend assets needed for the app via
[https://github.com/StayingSharp/frontend-aarp-azul7](https://github.com/StayingSharp/frontend-aarp-azul7).
They are made available to the app via a rake task.

Whenever new components are ready for consumption, run

```sh
$ FRONTEND_REPO=<local path to azul7 repo> bundle exec rake frontend:update
```

Afterwards, create a commit to check in the changed files.

**CAVEAT**: Do NOT modify the files in `/vendor/assets/<dirname>/azul7` since
they will be destroyed the next time the `frontend:update` task runs

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
### Frontend Deployment Configuration

To deploy to AWS S3 + Cloudfront, you'll need to configure aws client:

```bash
$ brew up
$ brew install aws-cfn-tools awscli
$ aws configure
```
(you'll need ACCESS_KEY_ID and SECRET_ACCESS_KEY to configure, choose defaults for all other options)

And you'll also need a file at `client/aws.json` that looks like the following:

```json
{
  "production": {
    "region": "us-west-2",
    "accessKeyId": "ACCESS_KEY_ID",
    "secretAccessKey": "SECRET_ACCESS_KEY",
    "distributionId": "ID_OF_CLOUDFRONT_DISTRIBUTION",
    "bucket": "NAME_OF_S3_BUCKET",
    "params": {
      "Bucket": "NAME_OF_S3_BUCKET_AGAIN"
   }
  },
  "staging": {}, // Staging environment configs go here
  "dev": {}, // Dev environment configs go here
}
```

(be sure to use same ACCESS_KEY_ID and SECRET_ACCESS_KEY that you used to configure aws cli)

To build and deploy:

```sh
$ gulp deploy --env <ENVIRONMENT>
```

### Staging Deployment Procedure

CI will deploy the staging environment automatically on `gulp deploy --env staging`.

CI requires the follow environment variables to successfully deploy the frontend
to AWS:

```sh
AWS-BUILD-S3-BUCKET
AWS-BUILD-S3-BUCKET-REGION
AWS-BUILD-ACCESS-KEY-ID
AWS-BUILD-SECRET-ACCESS-KEY
AWS-BUILD-CLOUDFRONT-DISTRIBUTION
```

### Production Deployment Procedure
1. QA has accepted all stories in staging
1. Release manager creates an update to the CHANGELOG
  - should describe all new functionality being delivered
  - include sha
  - include links to accepted stories
1. Release manager creates a new tag corresponds to the new section of the CHANGELOG
1. Push production branch to heroku
1. Push frontend to aws with `$ gulp deploy --env production`
1. Push frontend to firebase with: `$ firebase deploy -f aarp-ss-prod`
