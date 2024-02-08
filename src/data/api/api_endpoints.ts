import { InjectionToken } from '@angular/core';

export const API_ENDPOINT = new InjectionToken<string>('apiEndpoint');
export const postgresConfig = {
  apiEndpoint: "http://localhost:5041/api/kunde",
};