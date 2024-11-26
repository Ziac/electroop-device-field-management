import { ABBFirmwareService } from './abb';

// Add other manufacturer services as needed
export const manufacturerServices = {
  abb: new ABBFirmwareService(process.env.ABB_API_KEY || ''),
  // Add other manufacturers here
};

export type ManufacturerService = typeof manufacturerServices[keyof typeof manufacturerServices];