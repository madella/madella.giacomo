---
title: "Zero Trust CPS"
excerpt: "Testing environment for industrial/Cyber-Physical System (CPS) configured with a zero-trust approach through micro-segmentation"
header:
  image: /assets/images/CPS.svg
  teaser: /assets/images/CPS.svg
sidebar:
  - title: "Project Type"
    text: "Academic"
  - title: "References"
    text: "https://github.com/madella/virtual-nebula-microseg"
toc: true
number: 2
---
## Project Work On Cybersecurity
### Assignment:
Set up a moderately complex testing environment that simulates an industrial/Cyber-Physical System (CPS) context and is configured with a zero-trust approach through micro-segmentation. Try to use nebula: A scalable overlay networking tool with a focus on performance, simplicity, and security (github.com), which is a kind of VPN that enables you to implement micro-segmentation. If you can find images/containers of virtual machines representing IoT/CPS devices, you could try connecting them using this method, implementing micro-segmentation to isolate them, and testing that everything functions properly.

--------------------------------

### Requirements
You must have installed:
- nebula (only to produce nebula-cert)
- Docker

### Network's Blueprint 
LEGEND: ``x`` is used to represent the number of IoT, x is parametric, and you can run the number that you want
<!-- ![Blueprint](blueprint.png) -->

The network used on "*bare-metal*":
- 172.20.0.100/24 (lighthouse) ``//cannot use 172.20.z.1 because is used to link the virtual interface to the docker network itself``
- 172.20.x.y/24 (iot-dev-x) ``//(y!=1): ip is not fixed (it is possible if we want by reintroducing commented line in the run_containers.sh part of iot-devs), they only became on a specific net``
- 172.20.50.2/24 (iot-master)

(all different networks, not a part of same subnet!)

The address configured in micro-segmented-vpn:
- 192.168.100.1 (lighthouse)
- 192.168.100.x+1 (iot-dev-1) ``//because ...1 is used for lighthouse``
- 192.168.100.2 (iot-dev-2)
- 192.168.100.3 (iot-dev-3)
- [...]
- 192.168.100.x (iot-dev-x)
- 192.168.100.50 (iot-master)

### Firewalls
I've chosen to set the following configuration in the device's firewall

#### iot-devs:
port 1883 to communicate to master-iot in outbound communication and ``icmp`` in & out for testing nebula networking
```
outbound:
    - port: 1883
      proto: any
      host: iot-master

    - port: any
      proto: icmp
      host: any

  inbound:
    - port: any
      proto: icmp
      host: any
```
#### iot-master:
Allowing inbound for mqtt port (1883)
```
outbound:
    - port: any
      proto: icmp
      host: any

  inbound:
    - port: any
      proto: icmp
      host: any
    
    - port: 1883
      proto: any
      host: any
```
#### lighthouse:
And minimal protocol for lighthouse:
```
  outbound:
    # Allow all outbound traffic from this node
    - port: any
      proto: icmp
      host: any

  inbound:
    # Allow icmp between any nebula hosts
    - port: any
      proto: icmp
      host: any
```
------------------------------

### How to use
In the first run to do all automatically: (it takes some minutes also based on x) (you need to choose the x you want -> number of iot)
```bash:
./setup_env.sh x
```
--------------------------------------------------------------------------------------------------------------
After the first run, if you want to restart the container you can start it with that script (or manually if you want)
```bash:
./run_containers.sh
```
``run_containers.sh``contains the leading actor (also with yml firewalls) of this project, running manually, could cause some problems. To understand the configuration of this project a read of this script is recommended.

and if you want to rebuild them:
```bash:
./build_containers.sh
```

  NB: here we do not need to specify ``x`` because the value is saved on local file ``.nIOT``
--------------------------------------------------------------------------------------------------------
Finally to inspect that everything is working:
```bash:
docker attach iot-master
```
or:
```bash:
docker exec -it lighthouse /bin/bash
ping 192.168.100.*x*
```
where instead of ``lighthouse`` you can change with ``iot-master`` or ``iot-dev-*``.

### Troubleshooting
#### TUN/TAP on arch-Linux:
I had some problems with TUN/TAP dev since I was runningh this entire project on Arch Linux, but with 
```
find /lib/modules/ -iname 'tun.ko.zst'
```
And then after finding it:
```
insmod /lib/modules/6.2.11-arch1-1/kernel/drivers/net/tun.ko.zst
```
in the end with the following command:
```
docker run
  [...]
    --device /dev/net/tun:/dev/net/tun\
  [...]
```
it is expected to work.

##@ Clean env
At the end of the experiment, to clean both docker and folders:
```
./remove_all.sh
```

#### Concepts
- Cyber-Physical System
- Zero Trust
- Micro-segmentation
- Nebula: https://github.com/slackhq/nebula
