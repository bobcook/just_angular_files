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

## Frontend

The frontend application is an Angular app located in the `client/` directory. The app is built with Gulp and structured for deployment with [Divshot][divshot]. To set up the frontend application, run `npm install` in the root directory, which will install Node and Bower dependencies and build the client code.

There are a variety of Gulp tasks for development purposes. All the Gulp tasks should be run in the `client/` directory. To run a server that watches for changes, run `gulp serve`. To deploy to Divshot, use `gulp deploy` once you are logged in to the Divshot CLI.

Environment variables are injected into the app from an `.env.json` file in the `client/` directory. All values will be included as injectable constants exposed to Angular. The following is a list of required environment variables:

- `API_URL` — Should be set to the URL of the backend (Rails) server. For example, if Rails is running on port 3000, it should be set to `http://localhost:3000`.

[divshot]: https://divshot.com

## Backend

The backend is a Rails API structured for deployment on Heroku.

### Authentication

In order for the frontend to be able to authenticate with AARP, the backend serves as a proxy that manages all third-party authentication itself, then returns a JWT to the client. When the user attempts to log in, they navigate to a remote URL on the backend, which redirects them to the AARP login flow. Once they've logged in, then they're returned to the backend, along with the auth token.

The auth token itself is encoded into a JWT, but the JWT is too long to fit in a URL query parameter, so it can't be directly sent back to the Angular app. Instead, a temporary "claim token" is generated, which is just a random string, which *itself* is passed as a query parameter to the Angular app. The frontend then makes an API call back to the backend to retrieve the actual JWT, and the temporary claim token is destroyed. The temporary tokens expire after one hour, and the JWTs expire after 24 hours.

## ThirdParty Dependencies

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

## Browser Compatibility

TODO: Add your team's agreed upon policy here.
