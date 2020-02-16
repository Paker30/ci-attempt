#!/usr/bin/env node

const Git = require('simple-git/promise');

Git().raw(['request-pull', '-p', 'master', './'])
    .then((status) => console.log('create PR', status))
    .catch((error) => console.error('something went wrong', error));