#!/usr/bin/env node

const Git = require('simple-git/promise');

const gitUser = process.argv[2];
const gitPassword = process.argv[3];
const gitRepo = process.argv[4];
const repoUrl = `https://${gitUser}:${gitPassword}@github.com/${gitUser}/${gitRepo}`; 

Git().addRemote('origin', repoUrl);

Git().revparse(['--short', 'HEAD']).then((sha) => {
    return Git().checkoutBranch(`release/${sha}`, 'master')
        .then(Git().push('origin', `release/${sha}`, ['--set-upstream']))
        .then(() => console.log(`create branch release/${sha}`))
    })
    .catch((error) => console.error('something went wrong', error));
