# AARP Staying Sharp

[ ![Codeship Status for philosophie/aarp-staying-sharp](https://codeship.com/projects/5ea238d0-28c4-0133-e286-1ecec8ed5cc2/status?branch=master)](https://codeship.com/projects/97822)
[![Code Climate](https://codeclimate.com/repos/55d4c46de30ba0228b00a9c3/badges/9ddd857d2dd0872bb1a7/gpa.svg)](https://codeclimate.com/repos/55d4c46de30ba0228b00a9c3/feed)

## Setup

```bash
$ bundle
$ bundle exec rake newb
```

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
