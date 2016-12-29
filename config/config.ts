import { OpaqueToken } from '@angular/core';

import { ApiUrlsConfig } from './api-urls-conf';

export const APP_CONFIG_TOKEN = new OpaqueToken('app.config');

const API_BASE_URL = 'https://murmuring-ocean-10826.herokuapp.com/en/api/2/';
export const APP_CONFIG: AppConfig = {
  apiUrls: {
    airports: `${API_BASE_URL}forms/flight-booking-selector/`,
    cheapFlights: `${API_BASE_URL}flights/`
  }
};

export interface AppConfig {
  apiUrls: ApiUrlsConfig;
}
