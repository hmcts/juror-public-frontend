Juror Public Front End
===================
- Author: ODSC
- Technologies: NodeJS, Express, Nunjucks
- Summary: A front-end for responding to jury summons

## What is it?
Provides a front-end for responding to jury summons




## Development Environment

### Installation
We require NodeJS and NPM, the latest LTS releases should suffice.

Install [Node version manager](https://github.com/creationix/nvm) 

Development Environment Currently uses 8.9.4

```bash
nvm install 8.9.4
```


#### Global Packages
Once Node and NPM are working you must install the following packages globally using;

```bash
npm install -g grunt-cli node-gyp
```

[Refer to this document if you get a permission issue](https://docs.npmjs.com/getting-started/fixing-npm-permissions)

#### Local Packages
Install the main packages locally from `package.json` using the commands;
```bash
npm install
```


#### Environment Variable
##### <a name="environment_secrets"></a>Secrets
In order for certain parts of the system to work a configuration secrets file must be created, this is ignored by git
to prevent these values from entering source control. The file must be located at `server/config/environment/secret.js` and there is a template called `secret.template.js` in the same directory which can be used for reference.

##### System
As well as the secret values above, certain configuration values can be overwridden when starting the server. These can be environment variables within the system or as commands prior to the node start script. For example `PORT=4000 node server/index.js`. The available options are detailed here;

| Variable      | Accepted values                 | Default value                   | Description                                                 |
| ------------- | ------------------------------- | ------------------------------- | ----------------------------------------------------------- |
| NODE_ENV      | development / production / test |                                 | What environment we are building                            |
| PORT          | {integer}                       | 3000                            | The TCP port the server will bind to                        |
| IP            | {string}                        | '0.0.0.0'                       | The IP address the server will bind to                      |
| API_ENDPOINT  | {string}                        | 'http://localhost:8080/api/v1/' | The full Url to the back-end, including the version prefix  |
| TRACKING_CODE | {string}                        |                                 | The code for analytics tracking                             |


### Development server
The development environment has been configured to make use of [Browsersync](https://www.browsersync.io) and [livereload](https://github.com/gruntjs/grunt-contrib-watch#optionslivereload). This means that any time you make code changes to the Node / Express backend the server will reload itself, if you make changes to the front-end then the browser should refresh itself without having to restart the server.

To run the environment during development you can run the command below;

```bash
grunt serve
```


### Code Quality / Linting
#### SCSS Lint
We're using scss-lint via a grunt task. This requires that you have [ruby installed](https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-ubuntu-14-04) on your machine as well as the [scss-lint gem](https://github.com/brigade/scss-lint#installation). We're mostly using the default config: any custom rules are set in the `.scss-lint.yml` file at the root of the project. To run manually use the command

```bash
grunt scsslint
```

Plugins are available for code editors, allowing you to lint the file as you write it:

* Sublime - [SublimeLinter-contrib-scss-lint](https://packagecontrol.io/packages/SublimeLinter-contrib-scss-lint).
* Atom - [linter-scss-lint](https://atom.io/packages/linter-scss-lint)
* VSCode - [scss-lint](https://marketplace.visualstudio.com/items?itemName=adamwalzer.scss-lint)


#### ESLint
For javascript we're using [ES Lint](http://eslint.org/) via a grunt task. Non-default rules are specified in the `.eslintrc` file at the root of the project and files / patterns to be ignored are listed in the `.eslintignore` file in the same location. To run manually use the command

```bash
grunt eslint
```

Again, plugins are available for code editors:

* Sublime - [SublimeLinter-contrib-eslint](https://packagecontrol.io/packages/SublimeLinter-contrib-eslint)
* Atom - [linter-eslint](https://github.com/AtomLinter/linter-eslint)
* VSCode - [vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)


#### SonarQube
The ODSC has a standard set of rules for Javascript and checking code against SonarQube is part of the security requirements of the project, as some of the code checks performed match against common security vulnerabilities. There is a `sonar-[branch].properties` file at the root of the project to configure some parts of the SonarQube process. The SonarQube scan should be done automatically as part of the Jenkins build.




### Testing
There are several aspects to testing which can be run using Grunt. At a basic level tests can be run run using the below commands.
```bash
grunt test:unit
grunt test:integration
grunt test:coverage
npm run test:e2e
```

#### Unit
Unit tests can be written by placing a `*.spec.js` file along-side the file which needs tested. These will build the front-end server as needed.

#### Integration
Integration tests can be written by placing a `*.integration.js` file along-side the file which needs tested. These will build and run the front-end server as needed.

#### End-to-end
End-to-end tests can be written by creating Cucumber feature files inside `tests/e2e/features`. These will require that the front-end server be running.

#### Coverage
Coverage reports can also be generated and will create HTML reports with a `coverage` folder, as well as checking against defined thresholds in regards to failure or not.




## Build Environment (WIP)
A possible process to run on a build server is as follows:
```
npm install -g grunt-cli --silent
npm install --silent
npm test
grunt mocha_istanbul
grunt code-lint
grunt accessibility-check
NODE_ENV=production grunt build:dist
```

Note that this assumes there is already a mock server running with a command such as:
```
grunt:mock
```




## Live Environment
To build for production environment run the following command which will create a folder called `dist` which can be
treated as an artifact to be deployed. Please also ensure you have created the secret file as described in [Secrets section](#environment_secrets).
```
grunt build:dist
```

This command will not run tests, as it is assumed that running the distribution build process will be triggered after tests have passed, coverage thresholds are maintained and linters and SonarQube checks have been made.
