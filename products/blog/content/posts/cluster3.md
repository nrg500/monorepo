+++
author = "Berwout de Vries Robles"
title = "Building a home kubernetes cluster - One node cluster"
date = "2021-02-28"
summary = "Part 3 of series describing the home cluster build. All the preparations are done, time to finally start making a cluster!"
tags = ["cluster"]
+++

# Building a home kubernetes cluster - One node cluster
Now that I have a DMZ, it is time to create the cluster and to enable myself to securely expose something on that cluster. In order to securely expose services on the cluster I would like to have them behind SSL certificates. [Let's Encrypt](https://letsencrypt.org) allows us to request these certificates for free. 

## Painting a picture
 In the future I also want to do some public CI/CD on the cluster, preferably with SSL as well. So in order to avoid spamming [Let's Encrypt](https://letsencrypt.org) with individual requests, I am going to request a wildcard certificate. This is a single certificate that secures all traffic to [*.berwout.nl](https://berwout.nl), so any subdomain of berwout.nl. 

I want this certificate to secure all traffic towards the cluster. Because I am the only tenant of the cluster, I don't mind if the SSL terminates there and I will just use HTTP to communicate inside my cluster for now. I want to avoid as much maintenance burden as I can so I am going to automate the certificate requests and renewals.

I would like any routing going to [*.berwout.nl](https://berwout.nl) to go to the cluster and from there I would like to route purely through [Ingress routing](https://kubernetes.io/docs/concepts/services-networking/ingress/).

So it seems I will need the following:
- Kubernetes
- An Ingress controller
- Automated certificate requests and renewal

## Setting up
### Kubernetes
So at this stage, I have a server with a clean Ubuntu server 20.04 install, available through SSH over my local network with a static IP. As discussed in [Project start](https://berwout.nl/blog/cluster1) and [Setting up a DMZ](https://berwout.nl/blog/cluster2). I followed the recommendations by Ubuntu [here](https://ubuntu.com/kubernetes/install) and since I don't want to dive nose first into maximum complexity I decided to go for the [microk8s install](https://ubuntu.com/kubernetes/install#single-node). This is a very straight-forward kubernetes installation with only a few commands. I installed the latest stable kubernetes version, which was `1.20/stable` at the time of writing this.

By default this is a pretty barebones installation and we will not be able to expose anything through a [LoadBalancer](https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer) type service without some work. Because I would like to emulate somewhat "normal" kubernetes workflows, I would like to have a LoadBalancer available in my cluster.

Luckily microk8s offers some easy to install [addons](https://microk8s.io/docs/addons), amongst which there is a very barebones LoadBalancer implementation called MetalLB. Furthermore they recommend always enabling the dns addon, so I went ahead and enabled coredns as well. Metallb will ask for an ip-address range. Because I am currently running on a single IP (one node cluster with one network card), I can just put that single IP there. Note that this should be the IP that your node has internally in your network!

`microk8s enable dns`

`microk8s enable metallb` 

when it asks for an ip range, put the internal IP of your node, for instance: `192.168.0.200-192.168.0.200`.

Now if you create a service with type LoadBalancer, after a little bit of waiting it should assign an EXTERNAL-IP, visible when you `kubectl get svc`. This means that when a request enters the server with a destination address of that IP-address, it will get routed to that kubernetes service. Our router changes the destination IP of all traffic forwarded to our node to match our internal address. So that means that any requests forwarded by our router now land in our cluster on that service endpoint!

### Ingress controller
An Ingress controller is basically a front-proxy for your cluster. This means it receives all the traffic coming into the cluster and then based on the rules it reads from Ingress resources available in the cluster it routes the traffic towards specific services. 

I think the most common choice for an Ingress controller is nginx, but I am going to use [traefik](https://traefik.io/) as an Ingress Controller for a few reasons:
- It was developed with an API first mentality, making it fully configurable through API.
- I like their configuration format more than nginx (toml vs custom language).
- They have quite extensive documentation surrounding a Let's Encrypt [setup like mine](https://doc.traefik.io/traefik/user-guides/crd-acme/).
- They can handle automated certificate request and renewal with my domain provider.
- Their logo is the bomb.
  
  ![traefik logo](https://d1q6f0aelx0por.cloudfront.net/product-logos/library-traefik-logo.png?)


### Automated Certificate requests and renewal with Traefik
To get a certificate from [Let's Encrypt](https://letsencrypt.org) you need to be able to prove ownership of the domain and for wildcard certificates this check is slightly heavier. I will have to verify through a [DNS-01 challenge](https://letsencrypt.org/docs/challenge-types/). Basically this challenges you to add a TXT record to your DNS record with a specific key, proving that you can modify the DNS, therefore you own the domain. Because it modifies the DNS record it does suffer a slight bit of delay because the DNS needs to propagate across the network in order for it to get verified. You can mitigate this by pointing it to a few specific DNS servers. 

Usually your domain and DNS are controlled by a domain provider, this means that if you want to automatically edit the DNS to add a text record, your domain provider needs to offer an API to do so. Luckily my domain provider [transip](https://www.transip.nl/) has an API for this. 

Traefik helps me by automating the certifcate request and renewal. Basically it looks at what Ingress routes I have defined and decides what certificates it needs based on that. If it does not have one of those, it will request Let's Encrypt for a new certificate. It will also automatically renew any expired certificates. Furthermore traefik keeps a list of domain providers they have [built-in automation](https://doc.traefik.io/traefik/https/acme/) for. This means they wrote some code to let me easily automate certificate requests and renewal for my domain provider. 

It looks something like this:

![picture of dns challenge](https://berwout.nl/img/dns_challenge.gif)

All I had to do to get this working is add a few environment variables and arguments to the traefik deployment:

```yaml
env:
  - name: TRANSIP_ACCOUNT_NAME
    value: <account_name>
  - name: TRANSIP_PRIVATE_KEY_PATH
    value: <location of secret key mount>
args:
  - --certificatesresolvers.myresolver.acme.dnschallenge=true
  - --certificatesresolvers.myresolver.acme.dnschallenge.provider=transip
  - --certificatesresolvers.myresolver.acme.dnschallenge.delaybeforecheck=0
  - --certificatesresolvers.myresolver.acme.dnschallenge.resolvers=ns0.transip.net,ns1.transip.nl,ns2.transip.eu,1.1.1.1,8.8.8.8
```

Basically I tell it what credentials to use to connect with my transip account and I tell it to use a dnschallenge. Because dns usually takes a while to propagate, which means it would take a while to get the certificate. I am pointing the traefik proxy to ask it to transips domain name servers first.

## Conclusion
What I ended up with is a combination of this [guide by traefik](https://doc.traefik.io/traefik/user-guides/crd-acme/) and the information about DNS-challenges on [this page](https://doc.traefik.io/traefik/https/acme/), to end up with [this configuration for my proxy](https://github.com/nrg500/cluster/blob/main/services/traefik/deployment.yaml). Now I have automated certificate generation and renewal for [*.berwout.nl](https://berwout.nl) and [www.berwout.nl](https://berwout.nl).








