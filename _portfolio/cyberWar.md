---
title: "Spear Phishing Attack Simulation"
excerpt: "Project work of Cybersecurity, simulating a real spear pishing attack"
header:
  teaser: /assets/images/cw.png
  image: /assets/images/cw_schema.png
sidebar:
  - title: "Project Type"
    text: "Academic"
toc: true
number: 2
---
<!-- https://github.com/madella/cyberWar -->
### Project by
- **Massimo Capuzzo**  
- **Giacomo Madella**  
- Date: 11th January 2023

---

## Context: Russia-Ukraine War and Cyberwarfare

The project explores a **spear phishing** attack within the broader context of the **Russia-Ukraine conflict**, characterized by:
- **Hybrid Warfare**: Combines conventional and cyber warfare.
- **Cyberwar**: Attacks are conducted through digital means, often targeting government infrastructure, initiated by state actors or their proxies.

### Notable Cyberattacks on Ukraine:
- **May 2014**: Attack on Kiev's power grid.
- **December 2016**: Targeting Ukraine’s presidential elections.
- **February-March 2022**: Surge of spear phishing campaigns, including the use of the **MicroBackdoor** malware.

---

## Spear Phishing

Spear phishing is a **targeted cyberattack** aimed at stealing personal information or installing malware, focusing on a specific individual or organization, unlike generic phishing attacks.

### Attacker: UNC1151
- A cyber espionage group linked to the Belarusian government.
- Co-authors of the **Ghostwriter** campaign.

### Simulation Overview
The project replicated a spear phishing attack with the following parameters:
- **Payload**: Remote Access Trojan (**MicroBackdoor**).
- **Infection Method**: Email containing a malicious **ZIP attachment**.
  
#### Goals:
1. Deploy the **MicroBackdoor** on the victim’s device.
2. Drop additional malware post-infection.

---

## Technologies and Tools Used

- **.chm**: HTML-based documents with hyperlinks.
- **.vbs**: Scripting language for HTML automation.
- **.lnk**: Shortcut file used in Windows.
- **.ini**: Configuration file.
- **.dll**: Dynamic link libraries for Windows.
- **.js**: JavaScript file to execute DLL deployment.

### MicroBackdoor Details
A **C2 (Command and Control) tool** for Windows, with a minimal footprint:
- Less than **5000 lines of code**.
- **Client DLL size**: under 20KB without compression.

---

## Attack Workflow

### Infection Process
1. **Victim**: Receives and opens a spear phishing email.
2. **Attacker**: Deploys malware via the malicious ZIP file.

### Post-Infection
- **MicroBackdoor** enables actions like taking **screenshots** and running tools such as **LaZagne** to extract sensitive information.

---

## Screenshots

![screenshot1](/assets/images/scw.png)
![screenshot2](/assets/images/scw1.png)
![screenshot3](/assets/images/scw2.png)

---

## Conclusions

- The spear phishing attack, simulated in a controlled environment, successfully replicated real-world techniques.
- **UNC1151** remains a significant threat in modern cyberwarfare.
- The use of effective malware, like **MicroBackdoor**, highlights the need for robust defense mechanisms, including up-to-date antivirus solutions.

---