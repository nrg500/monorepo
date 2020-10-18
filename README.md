# Monorepo
Welcome to this monorepo example.

## Prerequisites
* A kubernetes cluster with kubectl access. (Can just be local from your Docker installation).
* Optionally: A Jenkins installation with Docker in docker and kubectl. (I've included an example in the repo)

## To run
1. Run the jenkins example in the repo (`kubectl apply -f deployment.yaml`)
1. Setup Jenkins following the default installation. (retrieve admin password from the logs, make a default account and install the recommended plugins)
1. Install the Pipeline Utility Steps plugin in Jenkins (Manage Jenkins -> Manage Plugins -> Available Plugins, used for reading Json files in pipeline.)
1. Add a credential for Docker Hub with id `dockerhub` to the jenkins credential store (Used for pushing images)
1. Create a Jenkins Job that has the monorepo `https://github.com/nrg500/monorepo` as git source (or your own fork).
1. Hit run!

## Nota bene:
The deployment repo `https://github.com/nrg500/monorepo-deployments` contains all the deployments, but the image names are still pointed towards my personal Docker Hub, the DNS record in the deployments is also pointed at my own DNS, so if you want to be able to run the full example, you will need to change these.

The Jenkins that is included in this repo is just a quick example for you to get up and running as fast as possible. It is not something I would ever advise you to deploy on production as it has too many privileges on the cluster and for Docker in Docker functionality. There are more production ready solutions available all over the internet, but they require a bit more setup. If you already have your own Jenkins with kubectl and Docker in Docker I would use that.

# How the pipeline works

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