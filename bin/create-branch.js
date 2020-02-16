#!/usr/bin/env node

const Git = require('simple-git/promise');

Git().revparse(['--short', 'HEAD']).then((sha) => {
    return Git().checkoutBranch(`release/${sha}`, 'master')
        .then(() => console.log(`create branch release/${sha}`))
    })
    .catch((error) => console.error('something went wrong', error));
