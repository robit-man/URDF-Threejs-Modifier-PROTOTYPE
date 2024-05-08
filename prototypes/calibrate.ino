#include <Arduino.h>
#include <ArduinoJson.h>
#include <WiFi.h>
#include <SPIFFS.h>
#include <ESPAsyncWebServer.h>
#include <AsyncTCP.h>
// Function declarations
void setup();
void loop();
void onWebSocketEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len);
void sendReadingsOverWebSocket();
void readSensors();
void computeAverages();
void normalizeReadings();
void calibrateSensors();
void printReadings();
void saveCalibration();
void loadCalibration();
void promptLegSide();
void saveLegSide();
void loadLegSide();
void printSavedOffsets();
void printMACAddress();
void updateChartData();
void updateLegParts();

const char *ssid = "Mocha2.4";
const char *password = "mocha820";

AsyncWebServer server(80);
AsyncWebSocket ws("/ws");

int outerCalf = 14;
int innerCalf = 27;
int hip = 26;
int knee = 25;
int butt = 33;

bool isLeft = true;
const int numReadings = 10;
int readingsOuter[numReadings], readingsInner[numReadings], readingsHip[numReadings], readingsKnee[numReadings], readingsButt[numReadings];
int totalOuter = 0, totalInner = 0, totalHip = 0, totalKnee = 0, totalButt = 0;
int averageOuter = 0, averageInner = 0, averageHip = 0, averageKnee = 0, averageButt = 0;
int normalizedOuter = 0, normalizedInner = 0, normalizedHip = 0, normalizedKnee = 0, normalizedButt = 0;
int offsetOuter = 0, offsetInner = 0, offsetHip = 0, offsetKnee = 0, offsetButt = 0;
int readIndex = 0;
bool playMode = false;

const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Leg Control Panel</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.137.5/build/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three/examples/js/controls/OrbitControls.js"></script>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap');
    * { transition:all 0.2s ease;font-family: "Rajdhani", sans-serif; }
    body {background:#333; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    #nav-tab { border: 1px solid #1112; border-top-left-radius: 1rem;border-top-right-radius: 1rem; overflow: hidden; background-color: #333; width: 512px; max-width: 100%; }
    .tab {border-radius:unset!important; text-transform: uppercase; font-weight: bold; float: left; border: none; outline: none; cursor: pointer; padding: 14px 16px; transition: 0.3s; font-size: 17px; color: white; background-color: inherit; }
    .tab:hover { background-color: #ddd; color: olive; }
    .tabcontent { flex-flow:wrap;background: #fffa; color: #111a; border-bottom-left-radius: 1rem;overflow:hidden;gap:0.5rem; border-bottom-right-radius: 1rem; height: auto; width: calc(512px - 2rem ); display: none; padding: 1rem; border: 1px solid #ccc; border-top: none; }
    .active, .tab:hover { background-color: #555; }
    .row{display:flex;flex-flow:row;gap:0.5rem;}
    button { cursor: pointer;padding:0.5rem 1rem; background: olive; color: #fffa; font-weight: bold;letter-spacing:1px;text-transform: uppercase; border: 1px solid #1112; border-radius: 0.25rem; }
    button:hover{background:#333;}
    button:active{color:olive;}
    #twinContainer { border-radius: 0.25rem; overflow: hidden; width: 100%; height: 512px; }
    #dataCanvas{margin-bottom:auto;}
</style>
</head>
<body>
    <!-- Add this inside the <body> tag -->
<div id="errorContainer"></div>

<style>
  #errorContainer {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 300px;
    z-index: 1000;
  }
  .errorMessage {
    background-color: indianred;
    color: black;
    font-weight:bold;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    animation: fadeOut 5s forwards;
  }
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; transform: translateY(20px); }
  }
</style>

<div id="nav-tab">
  <button class="tab" onclick="openTab(event, 'Config')">Config</button>
  <button class="tab" onclick="openTab(event, 'Data')">Data</button>
  <button class="tab" onclick="openTab(event, 'Twin')">Twin</button>

</div>

<div id="Config" class="tabcontent">
    <button onclick="sendCommand('calibrate')">Calibrate</button>
    <button onclick="sendCommand('save')">Save Settings</button>
    <button onclick="sendCommand('play')">Play</button>
    <button onclick="sendCommand('stop')">Stop</button>
    <button onclick="sendCommand('saved')">Show Current Settings</button> <!-- New Button -->
    <h2 id="currentSettingsDisplay"></h2> <!-- Display Area -->
  </div>
  
<div id="Data" class="tabcontent" style="flex-flow:column;">
  <canvas id="dataCanvas"></canvas>
  <div class="row"><button onclick="sendCommand('play')">Play</button>
  <button onclick="sendCommand('stop')">Stop</button></div>
</div>

<div id="Twin" class="tabcontent">
  <div id="twinContainer"></div>
</div>

<script>
var ctx = document.getElementById('dataCanvas').getContext('2d');
var dataChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [], // Time labels if needed or can be empty
    datasets: [{
      label: 'Outer Calf',
      borderColor: 'rgb(255, 99, 132)',
      data: []
    }, {
      label: 'Inner Calf',
      borderColor: 'rgb(54, 162, 235)',
      data: []
    }, {
      label: 'Hip',
      borderColor: 'rgb(75, 192, 192)',
      data: []
    }, {
      label: 'Knee',
      borderColor: 'rgb(153, 102, 255)',
      data: []
    }, {
      label: 'Butt',
      borderColor: 'rgb(255, 159, 64)',
      data: []
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

function logError(message) {
  const errorContainer = document.getElementById('errorContainer');
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('errorMessage');
  errorMessage.textContent = message;
  
  // Add the error message to the container
  errorContainer.appendChild(errorMessage);
  
  // Automatically remove the message after 3 seconds
  setTimeout(() => {
    errorContainer.removeChild(errorMessage);
  }, 3000);
}

// Override the console.error function to use the custom error logging
const oldConsoleError = console.error;
console.error = function(message) {
  logError(message);
  oldConsoleError.apply(console, arguments);
};

// Example of triggering an error
console.error('This is a test error!');



var scene, camera, renderer, controls;
var legBones = [], skeleton, legMesh;

function initThreeJS() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('twinContainer').appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  camera.position.set(0, 2, 5);
  controls.update();

  // Lighting
  var ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight);
  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(0, 1, 1);
  scene.add(directionalLight);

  // Skeleton
  var geometry = new THREE.BoxGeometry(0.1, 0.5, 0.1);
  var material = new THREE.MeshPhongMaterial({ color: 0xffffff, skinning: true });
  legMesh = new THREE.SkinnedMesh(geometry, material);
  scene.add(legMesh);

  var hip = new THREE.Bone();
  var knee = new THREE.Bone();
  var ankle = new THREE.Bone();
  hip.position.y = -0.5; // Position hip at the top
  knee.position.y = -0.4; // Knee is below hip
  ankle.position.y = -0.4; // Ankle is below knee
  hip.add(knee);
  knee.add(ankle);
  legBones.push(hip, knee, ankle);

  skeleton = new THREE.Skeleton(legBones);
  legMesh.add(hip);
  legMesh.bind(skeleton);

  var helper = new THREE.SkeletonHelper(legMesh);
  helper.material.linewidth = 3; // Make skeleton lines thicker
  scene.add(helper);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

var ws = new WebSocket(`ws://${window.location.hostname}/ws`);

ws.onmessage = function(event) {
  var data = JSON.parse(event.data);
  updateChartData(dataChart, data.angles);
  updateLegParts(data.angles);

  // Check if the data contains 'currentSettings'
  if(data.currentSettings) {
    displayCurrentSettings(data.currentSettings);
  }
};

function displayCurrentSettings(settings) {
  var settingsText = `Outer Calf: ${settings.outerCalf}, Inner Calf: ${settings.innerCalf}, Hip: ${settings.hip}, Knee: ${settings.knee}, Butt: ${settings.butt}`;
  document.getElementById('currentSettingsDisplay').textContent = settingsText;
}

function sendCommand(command) {
  ws.send(JSON.stringify({ command: command }));
}


function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tab");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "flex";
  evt.currentTarget.className += " active";
}

document.addEventListener('DOMContentLoaded', function() {
  initThreeJS(); // Initialize Three.js when the document is loaded
  openTab(event, 'Config'); // Open the Config tab by default
});
</script>
</body>
</html>

)rawliteral";




void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }  
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());  // Print the local IP address

  if (!SPIFFS.begin(true)) {
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }
  loadCalibration();
  loadLegSide();

  for (int i = 0; i < numReadings; i++) {
    readingsOuter[i] = readingsInner[i] = readingsHip[i] = readingsKnee[i] = readingsButt[i] = 0;
  }

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/html", index_html);
  });

  ws.onEvent(onWebSocketEvent);
  server.addHandler(&ws);
  server.begin();
}

void loop() {
  if (Serial.available() > 0) {

    String command = Serial.readStringUntil('\n');
    command.trim();

    if (command == "mac") {
      printMACAddress();
    } else if (command == "chirality") {
      promptLegSide();
    } else if (command == "wifi") {
      Serial.print("IP Address: ");
      Serial.println(WiFi.localIP());  // Print the local IP address
    } else if (command == "calibrate") {
      calibrateSensors();
    } else if (command == "save") {
      saveLegSide();
      saveCalibration();
    } else if (command == "saved") {
      printSavedOffsets();
    } else if (command == "play") {
      playMode = true;
    } else if (command == "stop") {
      playMode = false;
    }
  }

  readSensors();
  computeAverages();
  normalizeReadings();

  if (playMode) {
    printReadings();
  }

  delay(1);
}

void onWebSocketEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len) {
  switch (type) {
    case WS_EVT_CONNECT:
      Serial.printf("Client connected: %u\n", client->id());
      client->ping();  // Optional: Send a ping to ensure a response
      break;
    case WS_EVT_DISCONNECT:
      Serial.printf("Client disconnected: %u\n", client->id());
      break;
    case WS_EVT_DATA:
      {
        AwsFrameInfo *info = (AwsFrameInfo *)arg;
        String msg = "";

        if (info->final && info->index == 0 && info->len == len) {
          // Whole frame received at once
          if (info->opcode == WS_TEXT) {
            msg = String((char *)data).substring(0, len);
          }
        }

        // Parse message and act accordingly
        if (msg.length() > 0) {
          Serial.printf("Received message from client %u: %s\n", client->id(), msg.c_str());

          // Example handling for specific commands
          StaticJsonDocument<200> jsonDoc;
          DeserializationError error = deserializeJson(jsonDoc, msg);
          if (!error) {
            String command = jsonDoc["command"];
            if (command == "calibrate") {
              calibrateSensors();
            } else if (command == "save") {
              saveCalibration();
            } else if (command == "play") {
              playMode = true;
            } else if (command == "stop") {
              playMode = false;
            } else if (command == "saved") {
              String currentSettings = String("Offsets - Outer: ") + offsetOuter + ", Inner: " + offsetInner + ", Hip: " + offsetHip + ", Knee: " + offsetKnee + ", Butt: " + offsetButt;
              client->text("{\"currentSettings\": \"" + currentSettings + "\"}");
            }
          }
        }
        break;
      }
    case WS_EVT_PONG:
      Serial.printf("Pong received from client %u\n", client->id());
      break;
    case WS_EVT_ERROR:
      Serial.printf("Error on client %u\n", client->id());
      break;
  }
}


void sendReadingsOverWebSocket() {
  String data = String(map(normalizedOuter, 0, 4096, 0, 360)) + "," + String(map(normalizedInner, 0, 4096, 0, 360)) + "," + String(map(normalizedHip, 0, 4096, 0, 360)) + "," + String(map(normalizedKnee, 0, 4096, 0, 360)) + "," + String(map(normalizedButt, 0, 4096, 0, 360));

  ws.textAll(data);
}

void readSensors() {
  totalOuter -= readingsOuter[readIndex];
  totalInner -= readingsInner[readIndex];
  totalHip -= readingsHip[readIndex];
  totalKnee -= readingsKnee[readIndex];
  totalButt -= readingsButt[readIndex];

  readingsOuter[readIndex] = analogRead(outerCalf);
  readingsInner[readIndex] = analogRead(innerCalf);
  readingsHip[readIndex] = analogRead(hip);
  readingsKnee[readIndex] = analogRead(knee);
  readingsButt[readIndex] = analogRead(butt);

  totalOuter += readingsOuter[readIndex];
  totalInner += readingsInner[readIndex];
  totalHip += readingsHip[readIndex];
  totalKnee += readingsKnee[readIndex];
  totalButt += readingsButt[readIndex];

  readIndex = (readIndex + 1) % numReadings;
}

void computeAverages() {
  averageOuter = totalOuter / numReadings;
  averageInner = totalInner / numReadings;
  averageHip = totalHip / numReadings;
  averageKnee = totalKnee / numReadings;
  averageButt = totalButt / numReadings;
}

void normalizeReadings() {
  normalizedOuter = averageOuter + offsetOuter;
  normalizedInner = averageInner + offsetInner;
  normalizedHip = averageHip + offsetHip;
  normalizedKnee = averageKnee + offsetKnee;
  normalizedButt = averageButt + offsetButt;
}

void calibrateSensors() {
  offsetOuter = 2048 - averageOuter;
  offsetInner = 2048 - averageInner;
  offsetHip = 2048 - averageHip;
  offsetKnee = 2048 - averageKnee;
  offsetButt = 2048 - averageButt;
  Serial.println("Sensors calibrated. Offsets applied.");
}

void printReadings() {
  Serial.print(map(normalizedOuter, 0, 4096, 0, 360));
  Serial.print(",");
  Serial.print(map(normalizedInner, 0, 4096, 0, 360));
  Serial.print(",");
  Serial.print(map(normalizedHip, 0, 4096, 0, 360));
  Serial.print(",");
  Serial.print(map(normalizedKnee, 0, 4096, 0, 360));
  Serial.print(",");
  Serial.println(map(normalizedButt, 0, 4096, 0, 360));
}

void saveCalibration() {
  File file = SPIFFS.open("/calibration.txt", FILE_WRITE);
  if (!file) {
    Serial.println("Failed to open file for writing");
    return;
  }

  file.printf("Outer:%d,Inner:%d,Hip:%d,Knee:%d,Butt:%d\n", offsetOuter, offsetInner, offsetHip, offsetKnee, offsetButt);
  file.close();
  Serial.println("Calibration data saved.");
}

void loadCalibration() {
  File file = SPIFFS.open("/calibration.txt");
  if (!file) {
    Serial.println("No calibration file found");
    return;
  }

  String line = file.readStringUntil('\n');
  sscanf(line.c_str(), "Outer:%d,Inner:%d,Hip:%d,Knee:%d,Butt:%d", &offsetOuter, &offsetInner, &offsetHip, &offsetKnee, &offsetButt);
  file.close();
  Serial.println("Calibration data loaded.");
}

void promptLegSide() {
  Serial.println("Enter 'left' for left leg or 'right' for right leg.");
  while (!Serial.available()) delay(10);

  String side = Serial.readStringUntil('\n');
  side.trim();
  if (side == "left") {
    isLeft = true;
  } else if (side == "right") {
    isLeft = false;
  }
  Serial.println(isLeft ? "Left leg selected." : "Right leg selected.");
}

void saveLegSide() {
  File file = SPIFFS.open("/legSide.txt", FILE_WRITE);
  if (!file) {
    Serial.println("Failed to open file for writing");
    return;
  }

  file.println(isLeft ? "left" : "right");
  file.close();
  Serial.println("Leg side configuration saved.");
}

void loadLegSide() {
  File file = SPIFFS.open("/legSide.txt");
  if (!file) {
    Serial.println("No leg side configuration found. Please Set chirality.");
    promptLegSide();
    return;
  }

  String side = file.readStringUntil('\n');
  isLeft = (side == "left");
  file.close();
  Serial.println("Loaded leg side configuration: " + String(isLeft ? "left" : "right"));
}

void printSavedOffsets() {
  Serial.printf("Offsets - Outer: %d, Inner: %d, Hip: %d, Knee: %d, Butt: %d\n", offsetOuter, offsetInner, offsetHip, offsetKnee, offsetButt);
}

void printMACAddress() {
  uint8_t mac[6];
  WiFi.macAddress(mac);
  Serial.printf("MAC Address: %02X:%02X:%02X:%02X:%02X:%02X\n", mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
}
