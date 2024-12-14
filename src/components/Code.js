import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Grid } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Use a valid style


const Code = () => {
  const arduinoCode = `// ESP32 IOT SYSTEM ON ISSATGF
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

// Définir si le relais est normalement ouvert (NO)
#define RELAY_NO    true

// Nombre de relais
#define NUM_RELAYS  5

// GPIO pour les relais
int relayGPIOs[NUM_RELAYS] = {2, 4, 14, 12, 13};

// Crédentiels Wi-Fi
const char* ssid = "OPPO A73";
const char* password = "estai123";

// Crédentiels Firebase
#define API_KEY "AIzaSyDe4tK1DS3q8MTnbUE3bZXRz3kUwpB652c"
#define DATABASE_URL "https://esp8266-a-8b851-default-rtdb.firebaseio.com/" 
#define USER_EMAIL "haninasri14@gmail.com"
#define USER_PASSWORD "estai123"

// Objets Firebase
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
String userUID = "KzxtTF6QydTGBI97GGmTwfvUepD3";

// Configuration du capteur DHT
#define DHTPIN 15       // GPIO connecté au DHT
#define DHTTYPE DHT11  // DHT 11
DHT dht(DHTPIN, DHTTYPE);

// Initialisation du Wi-Fi
void initWiFi() {
  Serial.println("Connexion au Wi-Fi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connexion en cours...");
  }
  Serial.println("Connecté au Wi-Fi");
  Serial.println("Adresse IP : " + WiFi.localIP().toString());
}

// Initialisation de Firebase
void initFirebase() {
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.token_status_callback = tokenStatusCallback;

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  if (Firebase.ready()) {
    Serial.println("Authentification Firebase réussie");
    Serial.println("UID utilisateur : " + userUID);
  } else {
    Serial.println("Échec de l'authentification Firebase");
  }
}

// Fonction pour obtenir l'état du relais pour le HTML
String relayState(int numRelay) {
  if(RELAY_NO) {
    return digitalRead(relayGPIOs[numRelay-1]) ? "" : "checked";
  } else {
    return digitalRead(relayGPIOs[numRelay-1]) ? "checked" : "";
  }
}

// Envoyer les données du DHT à Firebase
void sendDHTData() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Échec de lecture du capteur DHT");
    return;
  }

  String tempPath = "/users/" + userUID + "/temperature";
  String humPath = "/users/" + userUID + "/humidity";

  if (Firebase.RTDB.setFloat(&fbdo, tempPath.c_str(), temperature)) {
    Serial.println("Température mise à jour");
  } else {
    Serial.println("Échec de mise à jour de la température : " + fbdo.errorReason());
  }

  if (Firebase.RTDB.setFloat(&fbdo, humPath.c_str(), humidity)) {
    Serial.println("Humidité mise à jour");
  } else {
    Serial.println("Échec de mise à jour de l'humidité : " + fbdo.errorReason());
  }
}

// Surveiller les états des relais dans Firebase
void monitorRelayStates() {
  for (int i = 1; i <= NUM_RELAYS; i++) {
    String relayPath = "/users/" + userUID + "/relay" + String(i);

    if (Firebase.RTDB.getInt(&fbdo, relayPath.c_str())) {
      int relayState = fbdo.intData();
      digitalWrite(relayGPIOs[i-1], relayState ? HIGH : LOW);
      Serial.printf("Relais %d est %s\n", i, relayState ? "ON" : "OFF");
    } else {
      Serial.println("Échec de lecture de l'état du relais depuis Firebase.");
    }
  }
}

void setup() {
  Serial.begin(115200);

  // Initialiser les GPIO des relais
  for (int i = 0; i < NUM_RELAYS; i++) {
    pinMode(relayGPIOs[i], OUTPUT);
    digitalWrite(relayGPIOs[i], RELAY_NO ? HIGH : LOW);
  }

  // Initialiser le capteur DHT
  dht.begin();

  // Connexion au Wi-Fi
  initWiFi();

  // Initialiser Firebase
  initFirebase();
}

void loop() {
  sendDHTData();
  monitorRelayStates();
  delay(1000);
}`;
const arduinoCode1 = `// ESP32 IOT SYSTEM ON ISSATGF
#include "ESP8266WiFi.h"
#include "ESPAsyncWebServer.h"
#include <DHT.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"


// Set to true to define Relay as Normally Open (NO)
#define RELAY_NO    true

// Set number of relays
#define NUM_RELAYS  5

// Assign each GPIO to a relay
int relayGPIOs[NUM_RELAYS] = {15, 4, 14, 12, 13};

// Wi-Fi credentials
const char* ssid = "OPPO A73";
const char* password = "estai123";

// Firebase credentials
#define API_KEY "AIzaSyDe4tK1DS3q8MTnbUE3bZXRz3kUwpB652c"
#define DATABASE_URL "https://esp8266-a-8b851-default-rtdb.firebaseio.com/"  // Replace with your RTDB URL
// Firebase Authentication Credentials
#define USER_EMAIL "haninasri14@gmail.com"  // Replace with your Firebase Auth email
#define USER_PASSWORD "estai123"           // Replace with your Firebase Auth password

// Firebase objects
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
String userUID = "KzxtTF6QydTGBI97GGmTwfvUepD3";  // Variable to store user UID

// DHT sensor configuration
#define DHTPIN 2       // Pin connected to the DHT sensor
#define DHTTYPE DHT11  // DHT 11 sensor
DHT dht(DHTPIN, DHTTYPE);

// WiFi initialization
void initWiFi() {
  Serial.print("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("WiFi connected");
  Serial.println("IP address: " + WiFi.localIP().toString());
}

// Firebase initialization
void initFirebase() {
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.token_status_callback = tokenStatusCallback;  // Defined in TokenHelper.h

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  if (Firebase.ready()) {
    //userUID = auth.token.uid;
    Serial.println("Firebase authentication successful");
    Serial.println("User UID: " + userUID);
  } else {
    Serial.println("Firebase authentication failed");
  }
}

// Get relay state for web page
String relayState(int numRelay) {
  if(RELAY_NO) {
    if(digitalRead(relayGPIOs[numRelay-1])) {
      return "";
    }
    else {
      return "checked";
    }
  } else {
    if(digitalRead(relayGPIOs[numRelay-1])) {
      return "checked";
    }
    else {
      return "";
    }
  }
}

// Process HTML placeholders
String processor(const String& var) {
  if (var == "BUTTONPLACEHOLDER") {
    String buttons = "";
    for (int i = 1; i <= NUM_RELAYS; i++) {
      String relayStateValue = relayState(i);
      buttons += "<h4>Relay #" + String(i) + " - GPIO " + String(relayGPIOs[i-1]) + "</h4><label class=\"switch\"><input type=\"checkbox\" onchange=\"toggleCheckbox(this)\" id=\"" + String(i) + "\" " + relayStateValue + "><span class=\"slider\"></span></label>";
    }
    return buttons;
  }
  return String();
}

// Send DHT data to Firebase
void sendDHTData() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  String tempPath = "/users/" + userUID + "/temperature";
  String humPath = "/users/" + userUID + "/humidity";

  if (Firebase.RTDB.setFloat(&fbdo, tempPath.c_str(), temperature)) {
    Serial.println("Temperature updated");
  } else {
    Serial.println("Failed to update temperature: " + fbdo.errorReason());
  }

  if (Firebase.RTDB.setFloat(&fbdo, humPath.c_str(), humidity)) {
    Serial.println("Humidity updated");
  } else {
    Serial.println("Failed to update humidity: " + fbdo.errorReason());
  }
}

// Monitor Firebase for relay state changes
void monitorRelayStates() {
// Monitor relay states from Firebase in real-time
  for (int i = 1; i <= NUM_RELAYS; i++) {
    String relayPath = "/users/" + userUID + "/relay" + String(i);

    // Get the integer value from Firebase to control the relay
    if (Firebase.RTDB.getInt(&fbdo, relayPath.c_str())) {
      // Check if the data is valid
      int relayState = fbdo.intData();
      if (relayState == 1) {
        digitalWrite(relayGPIOs[i-1], HIGH);  // Turn ON relay
        Serial.print("Relay ");
        Serial.print(i);
        Serial.println(" is ON");
      } else {
        digitalWrite(relayGPIOs[i-1], LOW);   // Turn OFF relay
        Serial.print("Relay ");
        Serial.print(i);
        Serial.println(" is OFF");
      }
    } else {
      Serial.println("Failed to read relay state from Firebase.");
    }
  }
}



void setup() {
  Serial.begin(115200);

  // Initialize relay pins
  for (int i = 1; i <= NUM_RELAYS; i++) {
    pinMode(relayGPIOs[i-1], OUTPUT);
    if (RELAY_NO) {
      digitalWrite(relayGPIOs[i-1], HIGH);
    } else {
      digitalWrite(relayGPIOs[i-1], LOW);
    }
  }

  // Initialize DHT sensor
  dht.begin();

  // Connect to Wi-Fi
  initWiFi();

  // Initialize Firebase
  initFirebase();

}

void loop() {
  // Periodically send DHT data to Firebase
  sendDHTData();
  
  // Monitor Firebase for relay state changes
  monitorRelayStates();
  
  delay(1000);  // Adjust the delay as needed
}`;
const arduinoCode2 = `// ESP32 IOT SYSTEM ON ISSATGF
https://dl.espressif.com/dl/package_esp32_index.json, http://arduino.esp8266.com/stable/package_esp8266com_index.json,https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`;
return (
    <Grid container spacing={4} sx={{ padding: '20px' }}>
      {/* Card 1 */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography variant="h5" component="div">
            Code pour ESP32--Wrover_Module
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
               Muserer la tempurature , humidité et controler les relais a base la methode Public/Subscribe au firebase
            </Typography>
          </CardContent>
          <CardContent>
            {/* Syntax Highlighter for Arduino code */}
            <SyntaxHighlighter language="cpp" style={solarizedlight}>
              {arduinoCode}
            </SyntaxHighlighter>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Grid>

      {/* Other Cards */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography variant="h5" component="div">
            Code pour ESP8622
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Muserer la tempurature , humidité et controler les relais a base la methode Public/Subscribe au firebase            </Typography>
          </CardContent>
          <CardContent>
            {/* Syntax Highlighter for Arduino code */}
            <SyntaxHighlighter language="cpp" style={solarizedlight}>
              {arduinoCode1}
            </SyntaxHighlighter>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Configuration ide
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ajputer le firmwere ESP32 en ide .
            </Typography>
          </CardContent>
          <CardContent>
            {/* Syntax Highlighter for Arduino code */}
            <SyntaxHighlighter language="cpp" style={solarizedlight}>
              {arduinoCode2}
            </SyntaxHighlighter>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Code;
