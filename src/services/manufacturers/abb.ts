import axios from 'axios';

interface ABBFirmware {
  version: string;
  releaseDate: string;
  type: 'stable' | 'beta';
  changelog: string[];
  size: string;
  compatibility: string[];
  requiredVersion: string;
  downloadUrl: string;
  hash: string;
  signature: string;
  metadata: {
    chargerModels: string[];
    region: string;
    features: string[];
  };
}

interface ABBAuthResponse {
  access_token: string;
  expires_in: number;
}

export class ABBFirmwareService {
  private baseUrl = 'https://api.abb-charging.com/v1';
  private apiKey: string;
  private accessToken: string | null = null;
  private tokenExpiry: Date | null = null;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async authenticate(): Promise<void> {
    try {
      const response = await axios.post<ABBAuthResponse>(`${this.baseUrl}/auth`, {
        apiKey: this.apiKey
      });

      this.accessToken = response.data.access_token;
      this.tokenExpiry = new Date(Date.now() + response.data.expires_in * 1000);
    } catch (error) {
      console.error('ABB Authentication failed:', error);
      throw new Error('Failed to authenticate with ABB API');
    }
  }

  private async ensureAuthenticated(): Promise<void> {
    if (!this.accessToken || !this.tokenExpiry || this.tokenExpiry < new Date()) {
      await this.authenticate();
    }
  }

  async getAvailableFirmware(model: string, region: string): Promise<ABBFirmware[]> {
    await this.ensureAuthenticated();

    try {
      const response = await axios.get<ABBFirmware[]>(`${this.baseUrl}/firmware`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        },
        params: {
          model,
          region
        }
      });

      return response.data;
    } catch (error) {
      console.error('Failed to fetch ABB firmware:', error);
      throw new Error('Failed to fetch available firmware from ABB');
    }
  }

  async downloadFirmware(firmwareId: string): Promise<Blob> {
    await this.ensureAuthenticated();

    try {
      const response = await axios.get(`${this.baseUrl}/firmware/${firmwareId}/download`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        },
        responseType: 'blob'
      });

      return response.data;
    } catch (error) {
      console.error('Failed to download ABB firmware:', error);
      throw new Error('Failed to download firmware file');
    }
  }

  async verifyFirmware(firmwareId: string, hash: string): Promise<boolean> {
    await this.ensureAuthenticated();

    try {
      const response = await axios.post(`${this.baseUrl}/firmware/${firmwareId}/verify`, {
        hash
      }, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      });

      return response.data.valid;
    } catch (error) {
      console.error('Failed to verify ABB firmware:', error);
      throw new Error('Failed to verify firmware integrity');
    }
  }
}