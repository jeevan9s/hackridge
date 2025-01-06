#include <WiFi.h>
#include <MPU6050_tockn.h>
#include <Wire.h>

MPU6050 mpu6050(Wire);

const char* ssid = "SM-G990W6139";     
const char* password = "mjko1170";     

const char* serverIP = "192.168.246.120"; 
const uint16_t serverPort = 5173;        

WiFiClient client;

const int ledPin = 2; 
bool ledOn = false;   
unsigned long ledStartTime = 0; 

void setup() {
  Serial.begin(115200);
  Wire.begin();
  mpu6050.begin();
  mpu6050.calcGyroOffsets(true);

  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");

  while (!client.connect(serverIP, serverPort)) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to server");
}

void loop() {
  if (client.available()) {
    String message = client.readStringUntil('\n');
    message.trim();
    Serial.println("Message received: " + message);

    if (message == "ON") {
      digitalWrite(ledPin, HIGH);
      ledOn = true;
      ledStartTime = millis();
      Serial.println("LED turned ON for 3 seconds.");
    }
  }

  if (ledOn && millis() - ledStartTime >= 3000) {
    digitalWrite(ledPin, LOW);
    ledOn = false;
    Serial.println("LED turned OFF after 3 seconds.");
  }

  if (!ledOn) {
    mpu6050.update();

    String data = String(mpu6050.getAccX(), 4) + "," +
                  String(mpu6050.getAccY(), 4) + "," +
                  String(mpu6050.getAccZ(), 4) + "," +
                  String(mpu6050.getGyroX(), 4) + "," +
                  String(mpu6050.getGyroY(), 4) + "," +
                  String(mpu6050.getGyroZ(), 4) + "\n";

    if (client.connected()) {
      client.print(data);
      Serial.println("Data sent: " + data);
    } else {
      Serial.println("Disconnected from server. Reconnecting...");
      while (!client.connect(serverIP, serverPort)) {
        delay(500);
      }
      Serial.println("\nReconnected to server");
    }

    delay(500);
  }
}

