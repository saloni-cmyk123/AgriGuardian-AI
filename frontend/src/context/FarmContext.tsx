"use client";

import React, { createContext, useContext, useState } from "react";

export interface Farm {
  id: string;
  name: string;
  location: string;
  sizeAcres: number;
  primaryCrop: string;
  soilType: string;
  healthScore: number;
}

const mockFarms: Farm[] = [
  {
    id: "farm-1",
    name: "Green Valley Fields",
    location: "Ludhiana, Punjab",
    sizeAcres: 12.5,
    primaryCrop: "Wheat (HD-3086)",
    soilType: "Clay Loam",
    healthScore: 88,
  },
  {
    id: "farm-2",
    name: "Surya Agritech Sector 4",
    location: "Nashik, Maharashtra",
    sizeAcres: 24.0,
    primaryCrop: "Tomato (Hybrid Red)",
    soilType: "Alluvial Black Soil",
    healthScore: 79,
  },
  {
    id: "farm-3",
    name: "Kaveri Delta Plot B",
    location: "Thanjavur, Tamil Nadu",
    sizeAcres: 8.2,
    primaryCrop: "Paddy (Samba Mahsuri)",
    soilType: "Silty Clay",
    healthScore: 94,
  },
];

interface FarmContextType {
  farms: Farm[];
  activeFarm: Farm;
  setActiveFarm: (farm: Farm) => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [farms] = useState<Farm[]>(mockFarms);
  const [activeFarm, setActiveFarm] = useState<Farm>(mockFarms[0]);

  return (
    <FarmContext.Provider value={{ farms, activeFarm, setActiveFarm }}>
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error("useFarm must be used within a FarmProvider");
  }
  return context;
};
