#include "SCD40Sensor.h"
#include <SensirionI2CScd4x.h>
#include <Wire.h>


void SCD40Sensor::read()
{
    uint16_t co2 = 0;
    float temperature = 0.0f;
    float humidity = 0.0f;
    mySensor.readMeasurement(co2, temperature, humidity);
    float humedad_filtrada = aplicarFiltro(humidity);
    float humedad_calibrada = calibrarHumedad(humedad_filtrada);
    float temperatura_filtrada = aplicarFiltroTemperatura(temperature);
    float temperature_calibrada = calibrarTemperatura(temperatura_filtrada);
    this->temperatura = temperature_calibrada;
    this->humedad = humedad_calibrada;
    this->co2 = co2;
    this->VPD = calcularVPD(temperatura, humedad);
    Serial.print("Temperatura: ");
    Serial.println(this->temperatura);
    Serial.print("Humedad: ");
    Serial.println(this->humedad);
    Serial.print("CO2: ");
    Serial.println(this->co2);
    Serial.print("VPD: ");
    Serial.println(this->VPD);
}

// --- Calibración y filtros ---
float SCD40Sensor::calibrarTemperatura(float t) {
    float t_corr = TEMP_A * t + TEMP_B;
    return t_corr;
}

float SCD40Sensor::aplicarFiltroTemperatura(float val) {
    bufferTemp[idxTemp] = val;
    idxTemp = (idxTemp + 1) % WINDOW_TEMP;
    if (idxTemp == 0) fullTemp = true;

    float suma = 0.0f;
    int n = fullTemp ? WINDOW_TEMP : idxTemp;
    for (int i = 0; i < n; i++) suma += bufferTemp[i];
    return suma / n;
}

float SCD40Sensor::aplicarFiltro(float nuevaLectura)
{
    bufferHumedad[bufferIndex] = nuevaLectura;
    bufferIndex = (bufferIndex + 1) % WINDOW_HUM;
    if (bufferIndex == 0) fullHum = true;

    float suma = 0.0f;
    int n = fullHum ? WINDOW_HUM : bufferIndex;
    for (int i = 0; i < n; i++) suma += bufferHumedad[i];

    return suma / n;
}


float SCD40Sensor::calibrarHumedad(float rh)
{

    float rh_corr = RH_A * rh + RH_B;
    if (rh_corr < 0.0f) rh_corr = 0.0f;
    if (rh_corr > 100.0f) rh_corr = 100.0f;
    return rh_corr;
}

const String SCD40Sensor::buildJson()
{
    jsonDocument.clear();
    jsonDocument["co2"] = this->co2;
    jsonDocument["temperatura"] = this->temperatura;
    jsonDocument["humedad"] = this->humedad;
    jsonDocument["VPD"] = this->calcularVPD(temperatura, humedad);
    jsonDocument["sensor"] = this->id;
    String jsonString;
    serializeJson(jsonDocument, jsonString);
    return jsonString;
}

float SCD40Sensor::calcularVPD(float temperatura, float humedad)
{
    if (temperatura == 0.0f || humedad == 0.0f)
    {
        return 0.0f;
    }
    VPD = 0.6108f * exp((17.27 * temperatura) / (temperatura + 237.3f)) * (1.0f-(humedad/100.0f)); //Calculo de VPD  con la formula de Buck 1996 
    
    return VPD;

}

SCD40Sensor::SCD40Sensor(const char* id)
{
    this->id = id;
}

void SCD40Sensor::begin(TwoWire &wire)
{
    mySensor.begin(wire);
    mySensor.startPeriodicMeasurement();
    for (int i = 0; i < WINDOW_HUM; i++) bufferHumedad[i] = 0.0f;
    for (int i = 0; i < WINDOW_TEMP; i++) bufferTemp[i] = 0.0f;
}

void SCD40Sensor::setTemperatura(float temperatura)
{
    this->temperatura = temperatura;
}

void SCD40Sensor::setHumedad(float humedad)
{
    this->humedad = humedad;
}

void SCD40Sensor::setVPD(float VPD)
{
    this->VPD = VPD;
}

void SCD40Sensor::setCo2(float co2)
{
    this->co2 = co2;
}

const float* SCD40Sensor::getTemperatura() const
{
    return &temperatura;
}

const float* SCD40Sensor::getHumedad() const
{
    return &humedad;
}

const float* SCD40Sensor::getVPD() const
{
    return &VPD;
}

const float* SCD40Sensor::getCo2() const
{
    return &co2;
}

const char* SCD40Sensor::getId() const
{
    return id;
}


