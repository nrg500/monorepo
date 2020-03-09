# monorepo

Run Jenkins:

`docker run -d -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home --name jenkins jenkins/jenkins:lts`


## Determine products and tests to build
In order to determine which products and tests to build we need to get an overview of the changed files.

Here we can use the `triple dot` notation in `git diff`. 
The command looks like this: `git diff origin/master... --name-only`. 
This `triple dot` notation is equivalent to `git diff $(git merge-base A B) B`. It will retrieve the closest common ancestor of our commit and the master branch and find the changes between them. Normally the format of the command is `git diff A...B`. We left out commit B, if you leave out one commit, the command will take the HEAD of your current branch.
The reason we want the closest common ancestor here is that we do not want the diff to change without us explicitly making changes. We want to be able to have an unchanging environment for our builds in order to make them reproducible.
We are only interested in which files were changed, not in the actual changes, so we add `--name-only` to get only the filenames.