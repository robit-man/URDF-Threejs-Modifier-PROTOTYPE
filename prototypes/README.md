
[![Group 2](https://github.com/robit-man/dropbear-neck-assembly/assets/36677806/bd13c6f5-7a3f-4262-9891-4259f17abbe0)](https://t.me/fractionalrobots)

# DROPBEAR LEG AND HIP SYSTEM

This repository is focused on development of hip and leg low-level control by an ESP32 DevKit V1. The scripts and files are in prototype phase and the following are requirements to be implemented in the near future

## Features In Progress / Testing

- **SPIFFS Encoder Offsets:** Commands for saving and recalling offset values for AS5600 encoders installed in arbitrary positions around the leg assembly.
- **Play and Pause of Angle Stream:** The normalized values coming off of the encoders (mapped between 0 and 360) and when zeroed, set to 180, Streaming over serial and websockets.
- **Web Interface:** Using websockets to control, configure, and save the leg and hip encoders states.

### Screenshots of Webapp

![image](https://github.com/robit-man/dropbear-leg-system/assets/36677806/ee34a0da-3bf4-470b-ba3c-74c6a6834b39)
![image](https://github.com/robit-man/dropbear-leg-system/assets/36677806/e6f46c32-3573-4d2a-a062-87762a790544)
![image](https://github.com/robit-man/dropbear-leg-system/assets/36677806/60e75179-18ae-4e14-8f1c-c4b992740ad2)

## Features To Be Implemented

- **Threejs Digital Twin:** A 3D representation of the legs, the state of the joints, the angle of the assemblies relative to gravity. Taking advantage of [this repository!](https://github.com/gkjohnson/urdf-loaders)
- **Chart Saving / Pose Exporting:** The ability to export a current pose, or set of encoder values in a standard format TBD.
- **ESP-NOW Cross-Controller State Sharing:** Implementation of ESPNOW protocol to share the current relevant states of the leg and hip assemblies between one another. There are three controllers, one for each leg, and one for hips. Each assembly has 4 motors on its respective CAN Bus (over MCP2515), 2-4 AS5600 magnetic non-contact potentiometers. and 1-2 MPU9250's. 

#### THANK YOU EVERYONE IN [FRACTIONAL ROBOTS!!!](https://t.me/fractionalrobots)
