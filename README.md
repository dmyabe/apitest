# API TEST

API Test Automation project


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 


### Prerequisites

Before start, you need to install the following projects:

* [node](https://nodejs.org)
    * Please, follow this [link](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04) and use the option 'Install using NVM' with version >= 6.9.4
* [webdriver-manager](https://www.npmjs.com/package/webdriver-manager)
* [protractor](http://www.protractortest.org/#/)


## Install the dependencies of project:

$ npm install


## Executing

Command Line:
protractor protractor.conf.js --cucumberOpts.tags="@api_test"


## Details

1 - Your tests should have at least 5 different API calls: 
Badge, Answers, Questions, Users, Posts

2 - Your tests should have example with data driven test using external data source;
I don't have any connection with external data source like a database, but for this requirement, I use a template (test/templates/questions.json) with a JSON QUESTIONS response where I could manipulate the information of the fields in the BDD scenarios. 
Besides that all the important information like key and access token is in other file, located at: test/params/params.json. For more security this kind of information could be in a database.

3 - Your tests should have Json schema validation
See BDD scenarios at test/feature/api.feature

4 - Your tests should have environment configuration;
For this solution, the environment configuration is in a file (params.json).
With a simplified implementation, each environment could have a configuration file such as: qa_params.json, dev_params.json, sandbox_params.json, etc
But thinking about safety, sensitive information could be in a database for each environment.

5 - Your tests should be ready to use for CI integration (provide example how to do this);
For this implementation, it's necessary install some dependencies at the machine but runs with command line. Thinking about CI/CD integration we could run the tests inside a Docker environment. Docker is a tool that can running multiple containers. And for CI, we could use Jenkins to control the git pulls and start a pipeline with automated tests in Docker. If all the tests pass, the pipelines continues.

6 - Your tests should have test reports;
See test/results.json

7 - You should use GitHub for sharing results.



### Built With

* [WalnutJS](https://github.com/mmendesas/walnutjs) - The automation web framework used for interact with AngularJS
