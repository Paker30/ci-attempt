#!/usr/bin/env

const Git = require('simple-git/promise');
const repoUrl = `https://${$GIT_USER}:${$GIT_PASSWORD}@github.com/${GIT_USER}/${$REPO}`;

console.log(repoUrl);

Git.addRemote('origin', repoUrl);

Git().revparse(['--short', 'HEAD']).then((sha) => {
    return Git().checkoutBranch(`release/${sha}`, 'master')
        .then(Git().push('origin', `release/${sha}`, ['--set-upstream']))
        .then(() => console.log(`create branch release/${sha}`))
    })
    .catch((error) => console.error('something went wrong', error));
