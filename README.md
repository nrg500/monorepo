# monorepo

Run Jenkins (image with docker cli inside):

`docker run -d -p 8080:8080 -v jenkins_home:/var/jenkins_home  -v /var/run/docker.sock:/var/run/docker.sock --name jenkins jenkinsci/blueocean`

Workaround for macbook privileges, run jenkins as root.
`docker run -d -p 8080:8080 -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock --user root --name jenkins jenkinsci/blueocean`

Install helm `brew install helm`
Install kubectl `brew install kubectl`
Install gcloud shell
`gcloud init`
`gcloud container clusters create cluster-1`

## Determine products and tests to build
In order to determine which products and tests to build we need to get an overview of the changed files.

Here we can use the `triple dot` notation in `git diff`. 
The command looks like this: `git diff origin/master... --name-only`. 
This `triple dot` notation is equivalent to `git diff $(git merge-base A B) B`. It will retrieve the closest common ancestor of our commit and the master branch and find the changes between them. Normally the format of the command is `git diff A...B`. We left out commit B, if you leave out one commit, the command will take the HEAD of your current branch.
The reason we want the closest common ancestor here is that we do not want the diff to change without us explicitly making changes. We want to be able to have an unchanging environment for our builds in order to make them reproducible.
We are only interested in which files were changed, not in the actual changes, so we add `--name-only` to get only the filenames.

This gives us a list of filenames seperated by newlines. In order to find out which products the changes were made to, we use a regex with a capture group for the folder name (folder the product resides in). We filter out the duplicates as we may have made multiple changes to any one product.


## Running the builds
In order to run the product builds, we call on their specific `build.groovy` files in the product directories. The reason we want to always call these is to allow for customization in the build. The product is responsible for the way it is built and if any changes occur in the build of the product, it will trigger a rebuild of only that product due to the change being in the products' folder.

We do want to allow for some sort of generic builds that we use frequently, so the product in turn can decide to call load a generic buildscript. Any time a generic build is changed we will have to run all the builds as we can not be sure which ones use them. (Theoretically we could, but the optimization here may not be worth the added complexity).