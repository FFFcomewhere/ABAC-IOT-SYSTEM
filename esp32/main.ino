#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClient.h>
/* change ssid and password according to yours WiFi*/
const char *ssid     = "CMCC-RUA";
const char *password = "626626666";
// const char* ssid     = "Xiaomi 12";
// const char* password = "12344321";
/*
 * This is the IP address of your PC
 * [Wins: use ipconfig command, Linux: use ifconfig command]
*/
const char *host = "192.168.1.55";
const int port = 8082;

// const char* host = "192.168.10.117";
// const int port = 3389;
int num = 0;
void setup()
{
        Serial.begin(9600);
        Serial.print("Connecting to ");
        Serial.println(ssid);
        /* connect to your WiFi */
    WiFi.begin(ssid, password);
        /* wait until ESP32 connect to WiFi*/
    while (WiFi.status() != WL_CONNECTED)
    {
                delay(500);
                Serial.print(".");
           
    }
        Serial.println("");
        Serial.println("WiFi connected with IP address: ");
        Serial.println(WiFi.localIP());
}
void loop()  
{
        delay(1000);
        Serial.print("connecting to ");
        Serial.println(host);
        /* Use WiFiClient class to create TCP connections */
    WiFiClient client;
        
    if (!client.connect(host, port))
    {
                Serial.println("connection failed");
                return;
           
    }
        String msg = "test:" + String(num++);
        Serial.println(msg);
        client.println(msg);
        //client.stop();
}