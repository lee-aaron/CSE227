# CSE227

`./container/build.sh` to build sandbox Dockerfile

`./container/bash.sh` to start the container for development

`./container/yarn.sh [args]` to execute yarn commands such as `yarn start`

## Notes

Build the Dockerfile first before running `../container/yarn.sh` in `sample-npm` directory

## Sample Bad NPM Package Example

We can try first by running `cd sample-npm && yarn` to link the bad package to our dev repo.

Running `yarn start` will run the bad-npm-package function which will execute the malicious function.

You can see that it will print whatever the host envs are. To run this in the sandbox, you can run `../container/bash.sh` in `sample-npm` directory
and then `yarn start`. It will print the envs of the sandbox environment.

## Using libseccomp

`sudo apt-get install -y gperf` may be required

`sudo ./container/install-libseccomp.sh` will install libseccomp

or `brew install libseccomp`

## Policy

You will need a required-files.json file structured as an array of files or folders to create policies for.

`node ../policy/generate.js && node --experimental-policy=policy.json index.js`