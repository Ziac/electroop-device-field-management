import { useState, useEffect } from 'react';
import { manufacturerServices } from '../services/manufacturers';

interface UseFirmwareUpdatesProps {
  manufacturer: string;
  model?: string;
  region?: string;
}

export const useFirmwareUpdates = ({ manufacturer, model, region }: UseFirmwareUpdatesProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableFirmware, setAvailableFirmware] = useState<any[]>([]);

  useEffect(() => {
    const fetchFirmware = async () => {
      if (!manufacturer || !model) return;

      setLoading(true);
      setError(null);

      try {
        const service = manufacturerServices[manufacturer.toLowerCase()];
        if (!service) {
          throw new Error(`No service available for manufacturer: ${manufacturer}`);
        }

        const firmware = await service.getAvailableFirmware(model, region || 'global');
        setAvailableFirmware(firmware);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch firmware updates');
      } finally {
        setLoading(false);
      }
    };

    fetchFirmware();
  }, [manufacturer, model, region]);

  return { loading, error, availableFirmware };
};