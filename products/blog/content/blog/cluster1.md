+++
author = "Berwout de Vries Robles"
title = "Building a home kubernetes cluster - Project start"
date = "2021-02-21"
description = "Part 1 of series describing the home cluster build."
tags = ["cluster"]
categories = ["series"]
+++

# Building a home kubernetes cluster - Project start
I've decided I want to have a kubernetes cluster for home use. There are a couple of reasons for it:

* I want to host some of my own applications like this blog.
* I like the abstractions kubernetes offers to manage different types of applications with a single interface.
* I want to have an environment to experiment with kubernetes services.

I am planning to write down my thoughts and experiences in this blog, so I can remember what I did and why and so others can learn from it.
At first it will be mainly infrastructure setup, but later on I will probably write some code for this. All of it will be publicly available on my github at: <https://github.com/nrg500>

## Painting a picture
Alright, let's go over the minimum requirements for now and paint a picture of what that might look like.

* A domain
* A machine to run on
* Kubernetes
* Basic security

For now a single node cluster will do because I'm currently in such an early stage where I don't think adding the complexity of high availability will do a lot of good. To be honest my blog doesn't really have an SLA (Service Level Agreement) or many readers, so it doesn't need to be super resilient for now.

Something like this is the general idea:

![picture of idea placeholder](https://berwout.nl/bercloud.png)

## Setting up

### Basic security
Safety first! For this home project this means a few things for me:
1. SSL is a must.
2. The kubernetes cluster should be in a network separate from my home network.

For requirement one, I was very happy to see that [Let's Encrypt](https://letsencrypt.org) now supports [wildcard certificates](https://community.letsencrypt.org/t/acme-v2-production-environment-wildcards/55578). This means that not only will I be able to get free certificates, I will only need 2 to run any service I want! (one for berwout.nl and a wildcard for [*.berwout.nl](berwout.nl))

Requirement two is a bit trickier and requires me to set up a DMZ (Demilitarized zone) in my home network. The easiest way to do this involves buying a second router. However, if you are just experimenting and want to follow along with the blog series you don't "absolutely need" to do this. I just decided that if I am going to publish about this, I would at least need to make sure that if someone manages to get into my cluster they cannot break out into my home network.

### A domain
In order to buy a domain you can google for domain providers and mostly purchase from any you like. I bought the <https://berwout.nl> domain at [transip](https://transip.com), because they implemented DNS-01 challenges which lets you obtain the wildcard certificate I talked about earlier through [Let's Encrypt](https://letsencrypt.org). 

### A machine to run on
For the machine I also had a few requirements:
1. It should not be my desktop as I would like to turn that off every now and then.
2. It should be somewhat energy efficient.
3. It should not be too loud.
4. it should be somewhat small so I can mount it in my utility closet.
5. It should be able to run a database.

I ended up going for one of the Intel NUC Kits with an i5 processor, 32GB of RAM and 1TB SSD of storage. These NUC kits are nice and small, still pretty powerful and have decent energy usage so they should not hurt my electricity bill that much. 

### Kubernetes
Actually before kubernetes, we need an operating system to run it on! Because I have some experience managing Ubuntu servers and it is heavily used in the market, I decided to go for a basic install of [Ubuntu 20.04 server](https://ubuntu.com/download/server). 
Ubuntu actually has a few recommended ways of installing kubernetes, for simple Single node installs they recommend MicroK8s so that's what I've gone with for now!

## Conclusion
Alright! The project is well underway. I have set some requirements. I have painted a very basic picture of what I would like to have. I have chosen and gathered the necessary ingredients. I hope you are as excited as I am because it is finally time to start building! See you soon in the next installment.