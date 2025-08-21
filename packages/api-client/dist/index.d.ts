import { AxiosInstance } from 'axios';

declare const axios: AxiosInstance;
declare function onSessionExpired(callback: () => void): () => void;

export { axios, axios as default, onSessionExpired };
