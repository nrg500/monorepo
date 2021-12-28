+++
author = "Berwout de Vries Robles"
title = "Building a home kubernetes cluster - Setting up a DMZ"
date = "2021-02-22"
summary = "Part 2 of series describing the home cluster build. Before we create a cluster that we want to expose to the outside world, we need to make sure our home network is not overly exposed."
tags = ["cluster"]
+++

# Building a home kubernetes cluster - Setting up a DMZ
In order to serve content to the outside world I will need to open up my network to allow for HTTP/HTTPS traffic to come in.
Normally your default home router setup will not allow any incoming network traffic into your home network so we will need to open that up a little.
The world is a scary place and I would like to make sure that anyone coming into my network can not abuse a security flaw to hop into my home network.
This is what a DMZ (Demilitarized zone) is for. 


## Painting a picture
One of the easiest ways to set up a DMZ at home is to use a secondary router/firewall.

Basically something like this:

![picture of idea placeholder](https://berwout.nl/img/berdmz.png)

## Setting up
Note that your hardware is probably different from mine, but the steps below should work for most routers on the market. Sometimes the "security" features like port forwarding are hidden on consumer routers like it was on the router from my ISP. In the end I had to request a firmware update to get access to port forwarding and sometimes you may need to buy two routers, using the ISP's router purely as a modem.

To set this up I did the following:
1. Connect the secondary router to primary router with an ethernet cable.
2. Connect all your home devices to the secondary router instead of primary except for the devices you want to be in the DMZ (the servers).
3. Make sure that the primary and secondary router are giving out IP's on a different subnet so you don't get any IP collisions.
4. On the primary router reserve an IP-address for the device hosting your services and make sure it gets the same one every time. 
5. Port forward port 80 (http) and port 443 (https) from your primary router to the device hosting your services.

### Step 3
By default routers hand out addresses on certain subnetworks. For instance 192.168.0.0/24. IP addresses are made up out of 32 bits (4 bytes each representing a number between 0 and 255) and /24 means the first 24 are significant, so the router will vary the last number in this case. (192.168.0.0 - 192.168.0.255). If you want to know more, you can read about [subnetworks](https://en.wikipedia.org/wiki/Subnetwork). Most routers have a setting where you can vary the ip-addresses it gives out, so for instance if one of our routers is on 192.168.0.0/24 and the other is on 192.168.1.0/24 that is totally fine, just make sure they are not handing out the same addresses.

### Step 4
Usually routers have an option to place a DHCP reservation for a certain MAC address, so if your server is already connected to the router you can select it and reserve that IP so that every time that device connects it will receive the same IP. There are several other mechanisms to be able to reserve IP-adresses. If you do a google search for static IP-address or DHCP reservation you will find some resources. Reserving an IP is important because it will be the IP address the router will forward any HTTP and HTTPS traffic to in step 5. You don't want it to change every time you restart your server.

### Step 5
Usually routers have a port forwarding option somewhere in the security settings, you want to forward both 80 and 443 to the IP address you reserved in step 4. Sometimes theres also a choice for protocol (UDP / TCP). For HTTP/HTTPS traffic you mostly only need TCP and dedicated network admins may hate me for this, but for these experimental home purposes I recommend opening both, so you don't run into a gotcha later.

## Conclusion
Woooo yeah! We made a DMZ in our home and have some basic safety in place. Man, that was quite the hassle already... You really start to understand why people pay cloud providers to solve this stuff for them. See you next time when we start setting up the cluster!
