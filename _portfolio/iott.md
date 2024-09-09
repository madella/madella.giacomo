---
title: "IoT Threat Traker"
excerpt: "Project of Scalable and Reliable system using Azure Web Services, Shodan and Django"
header:
  image: /assets/images/iott.jpg
  teaser: /assets/images/iott.jpg
sidebar:
  - title: "Project Type"
    text: "Academic"
toc: true
number: 3
---
<pre>
  _____     _____                      _ _             
  \_   \___/__   \   /\/\   ___  _ __ (_) |_ ___  _ __     ╱|、 
   / /\/ _ \ / /\/  /    \ / _ \| '_ \| | __/ _ \| '__|   (˚ˎ 。7  
/\/ /_| (_) / /    / /\/\ \ (_) | | | | | || (_) | |       |、˜〵
\____/ \___/\/     \/    \/\___/|_| |_|_|\__\___/|_|       じしˍ,)ノ   
</pre>


## Assignment
Develop a Shodan-based security monitoring service to gather information
about security vulnerabilities of IoT devices and networks of utilities
### What to do:
- Develop a service that allows users to enter their devices and networks and
view information about the associated vulnerabilities and threats
- Use Shodan’s APIs to access detailed information about Internet-connected
devices
- Process and analyze data collected by Shodan to identify potential security
issues 
    - (Exploit search API fully implemented) on shodan's readme, we might implement that
- Provide real-time notifications to users when a security issue is detected, so
they can take immediate action
- Give users a comprehensive view of $Azure$ (structure?) is used to process and analyse the
data collected by Shodan and to provide a platform for viewing this information

## Documentation
### Blueprint
<pre>
iotmonitor/
├── main/
│   ├── __init__.py
│   ├── *.py
│   └── views.py (manage this and about pages)
├── users/
│   ├── __init__.py
│   ├── *.py
│   └── views.py (manage login, register and profile requests)
├── monitor/
│   ├── __init__.py
│   ├── api_shodan.py
│   └── views.py (manage update() request)
├── README.mn (this page)
└── manage.py
</pre>
### Description
Name of services:

- main: contains all html base for website
- monitor: for now contains only update request function
- users: manage all login/register function of django framework

## References

https://www.shodan.io

https://github.com/achillean/shodan-python

### zipfile
[fullproject.zip](/assets/files/iottrackercl.zip){: .btn .btn--info}