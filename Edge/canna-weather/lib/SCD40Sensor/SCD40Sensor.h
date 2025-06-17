#ifndef SCD40Sensor_h
#define SCD40Sensor_h
#include <SensirionI2CScd4x.h>

#include <Arduino.h>
#include <ArduinoJson.h>

//#include "SparkFun_SCD4x_Arduino_Library.h"

class SCD40Sensor {
    public:
        SCD40Sensor(const char* id);
        void begin(TwoWire &wire);
        const float* getTemperatura() const;
        const float* getHumedad() const;
        const float* getCo2() const;
        const float* getVPD() const;
        const char* getId() const;
        void read();
        const String buildJson();
        void setTemperatura(float temperatura);
        void setHumedad(float humedad);
        void setCo2(float co2);
        void setVPD(float VPD);
        
    private:
        const char* id;
        float temperatura;
        float humedad;
        float co2;
        float VPD;
        //---Calibracion de humedad ---
        const double RH_A = 1.0984004508214493;
        const double RH_B = -8.80279595994628;
        float calibrarHumedad(float humedad_filtrada);
        //---Calibracion de temperatura
        const float TEMP_A = 1.028076156171609;
        const float TEMP_B = -0.917172444844667;
        float calibrarTemperatura(float temperatura_filtrada);
        //---Calcular VPD ---
        float calcularVPD(float temperatura, float humedad);       
        //---Filtro humedad ---
        static const int WINDOW_HUM = 5;
        float bufferHumedad[WINDOW_HUM];
        uint8_t bufferIndex = 0;
        bool fullHum = false;
        float aplicarFiltro(float nuevaLectura);
        //---Filtro temperatura---
        static const int WINDOW_TEMP = 5;
        float bufferTemp[WINDOW_TEMP];
        uint8_t idxTemp = 0;
        bool fullTemp = false;
        float aplicarFiltroTemperatura(float val);
        //---Json---
        SensirionI2CScd4x mySensor;
        StaticJsonDocument<200> jsonDocument;
};

#endif