#include "AS7265xModule.h"
#include "SparkFun_AS7265X.h"



//hacer un constructor con todos los canales del sensor AS7265X


AS7265xModule::AS7265xModule(const char* id)
{   
    AS7265X sensor;
    this->id = id;
    float A = 0.0f; //410nm
    float B = 0.0f; //435nm
    float C = 0.0f; //460nm
    float D = 0.0f; //485nm
    float E = 0.0f; //510nm
    float F = 0.0f; //535nm
    float G = 0.0f; //560nm
    float H = 0.0f; //585nm
    float R = 0.0f; //610nm
    float I = 0.0f; //645nm
    float S = 0.0f; //680nm
    float J = 0.0f; //705nm
    float T = 0.0f; //730nm
    float U = 0.0f; //760nm
    float V = 0.0f; //810nm
    float W = 0.0f; //860nm
    float K = 0.0f; //900nm
    float L = 0.0f; //
}


// Nueva función para resetear el sensor
void AS7265xModule::reset() {
    sensor.softReset();  // Realiza el reset usando el método público
    delay(100);  // Permite que el sensor se reinicie
    Serial.println("Sensor AS7265X reseteado.");
}

void AS7265xModule::begin()
{
    if (sensor.begin() == false)
    {
        Serial.println("Intentando encontrar AS7265X");
        delay(10000);
        if (sensor.begin() == false)
        {
            Serial.println("No se pudo encontrar el sensor AS7265X");
        
        }
        else
        {
            Serial.println("Sensor AS7265X encontrado");
        }
    }else{
        Serial.println("Sensor AS7265X encontrado");
    }
}
void AS7265xModule::setGain(const char* gain, const int integration){
    if (gain == "1X")
    {
        sensor.setGain(AS7265X_GAIN_1X);
    }
    else if (gain == "37X")
    {
        sensor.setGain(AS7265X_GAIN_37X);
    }
    else if (gain == "16X")
    {
        sensor.setGain(AS7265X_GAIN_16X);
    }
    else if (gain == "64X")
    {
        sensor.setGain(AS7265X_GAIN_64X);
    }
    else
    {
        Serial.println("Default gain 1X");
    }
    //Integration cycles is from 0 (2.78ms) to 255 (711ms) in steps of 2.78ms
    sensor.setIntegrationCycles(integration); //Default 50*2.8ms = 140ms per reading
    
}


float AS7265xModule::normalize(float rawValue, float gain, float integrationTime) {
    return rawValue / (gain * integrationTime);
}

void AS7265xModule::Read(float gain, float integrationTime) {
    sensor.takeMeasurements();

    // Leer solo los 14 canales necesarios (A a U)
    float rawValues[14] = {
        static_cast<float>(sensor.getA()), static_cast<float>(sensor.getB()), static_cast<float>(sensor.getC()), static_cast<float>(sensor.getD()),
        static_cast<float>(sensor.getE()), static_cast<float>(sensor.getF()), static_cast<float>(sensor.getG()), static_cast<float>(sensor.getH()),
        static_cast<float>(sensor.getR()), static_cast<float>(sensor.getI()), static_cast<float>(sensor.getS()), static_cast<float>(sensor.getJ()),
        static_cast<float>(sensor.getT()), static_cast<float>(sensor.getU())
    };

    // Normalización inicial (dividir por ganancia y tiempo de integración)
    float normalizedValues[14];
    for (int i = 0; i < 14; i++) {
        normalizedValues[i] = rawValues[i];
    }

    // Asignar valores normalizados a los atributos de la clase
    this->A = normalizedValues[0];
    this->B = normalizedValues[1];
    this->C = normalizedValues[2];
    this->D = normalizedValues[3];
    this->E = normalizedValues[4];
    this->F = normalizedValues[5];
    this->G = normalizedValues[6];
    this->H = normalizedValues[7];
    this->R = normalizedValues[8];
    this->I = normalizedValues[9];
    this->S = normalizedValues[10];
    this->J = normalizedValues[11];
    this->T = normalizedValues[12];
    this->U = normalizedValues[13];

    // Imprimir valores normalizados para depuración
    Serial.println("Valores normalizados (Canales A a U):");
    for (int i = 0; i < 14; i++) {
        Serial.print("Canal ");
        Serial.print(i + 1);
        Serial.print(": ");
        Serial.println(normalizedValues[i]);
    }
}






const String AS7265xModule::buildJson()
{
    jsonDocument.clear();
    jsonDocument["A"] = this->A;
    jsonDocument["B"] = this->B;
    jsonDocument["C"] = this->C;
    jsonDocument["D"] = this->D;
    jsonDocument["E"] = this->E;
    jsonDocument["F"] = this->F;
    jsonDocument["G"] = this->G;
    jsonDocument["H"] = this->H;
    jsonDocument["R"] = this->R;
    jsonDocument["I"] = this->I;
    jsonDocument["S"] = this->S;
    jsonDocument["J"] = this->J;
    jsonDocument["T"] = this->T;
    jsonDocument["U"] = this->U;
    jsonDocument["V"] = this->V;
    jsonDocument["W"] = this->W;
    jsonDocument["K"] = this->K;
    jsonDocument["L"] = this->L;
    jsonDocument["sensor"] = this->id;
    String jsonString;
    serializeJson(jsonDocument, jsonString);
    return jsonString;
}








    

    
