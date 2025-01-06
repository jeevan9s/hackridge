export interface BloodPressureReading {
    timestamp: string;
    systolic: number;
    diastolic: number;
  }
  
  export interface HeartRateReading {
    timestamp: string;
    bpm: number;
  }

  export interface BloodOxygenReading {
    timestamp: string;
    spo2: number;
  }

  export interface CoreTemperatureReading {
    timestamp: string;
    temperature: number;
  }

  export interface RespiratoryRateReading {
    timestamp: string;
    breathsPerMinute: number;

  }