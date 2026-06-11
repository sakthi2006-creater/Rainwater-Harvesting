
'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Wifi, Cpu, Database } from 'lucide-react';
import { firebaseConfig } from '@/lib/firebase-config';
import { useLanguage } from '@/contexts/language-context';

export default function IotConnectPage() {
    const { t } = useLanguage();

    const arduinoCodeSnippet = `
#include <WiFi.h>
#include <Firebase_ESP_Client.h>

// Wi-Fi credentials
#define WIFI_SSID "YOUR_WIFI_SSID"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"

// Firebase project configuration
#define API_KEY "${firebaseConfig.apiKey}"
#define FIREBASE_PROJECT_ID "${firebaseConfig.projectId}"
#define USER_EMAIL "user@example.com" // The user email to associate data with
#define USER_PASSWORD "user_password"

// Define Firebase objects
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// Variable to hold the UID of the user
String uid;

void setup() {
  Serial.begin(115200);
  
  // Connect to Wi-Fi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  
  // Assign the project credentials
  config.api_key = API_KEY;
  config.project_id = FIREBASE_PROJECT_ID;

  // Sign in with email and password
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  Serial.println("Getting User UID");
  while (auth.token.uid == "") {
    vTaskDelay(1000 / portTICK_PERIOD_MS);
  }
  uid = auth.token.uid.c_str();
  Serial.print("User UID: ");
  Serial.println(uid);
}

void loop() {
  // Simulate reading a rainfall sensor
  float rainfall_mm = random(0, 50) / 10.0; // Random rainfall between 0.0 and 5.0

  if (Firebase.ready() && WiFi.status() == WL_CONNECTED) {
    String path = "iot_data/" + String(uid) + "/live_rainfall";
    
    Serial.printf("Setting float value on %s... ", path.c_str());
    if (Firebase.RTDB.setFloat(&fbdo, path.c_str(), rainfall_mm)) {
      Serial.println("ok");
    } else {
      Serial.println(fbdo.errorReason());
    }
  }

  delay(10000); // Send data every 10 seconds
}
`;

  return (
    <>
      <Header />
      <main className="container py-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl">
              <Wifi className="h-8 w-8" />
              <span>{t('iot_connect_title')}</span>
            </CardTitle>
            <CardDescription>{t('iot_connect_description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold mb-3">
                <Code className="h-5 w-5" />
                {t('iot_firebase_config_title')}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                {t('iot_firebase_config_description')}
              </p>
              <pre className="p-4 bg-secondary/50 rounded-md text-sm overflow-x-auto">
                <code>{JSON.stringify(firebaseConfig, null, 2)}</code>
              </pre>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold mb-3">
                <Cpu className="h-5 w-5" />
                {t('iot_device_setup_title')}
              </h2>
               <p className="text-sm text-muted-foreground mb-4">
                {t('iot_device_setup_description')}
              </p>
              <div className="prose prose-sm max-w-none text-foreground">
                <ol className="list-decimal list-inside space-y-2">
                  <li>{t('iot_step1')}</li>
                  <li>{t('iot_step2')}</li>
                  <li>{t('iot_step3')}</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold mb-3">
                <Database className="h-5 w-5" />
                {t('iot_example_code_title')}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                {t('iot_example_code_description')}
              </p>
              <pre className="p-4 bg-secondary/50 rounded-md text-sm overflow-x-auto custom-scrollbar">
                <code>{arduinoCodeSnippet}</code>
              </pre>
            </section>

          </CardContent>
        </Card>
      </main>
    </>
  );
}
