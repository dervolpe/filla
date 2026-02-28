/**
 * Configuração centralizada da URL base da API.
 * Em desenvolvimento: usa localhost:3000 (via Vite proxy ou direto)
 * Em produção (Docker): usa VITE_API_URL injetado no build pelo docker-compose
 */
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * URL do socket (mesmo host da API, sem /api suffix)
 * Ex: wss://api.filla.seudominio.com
 */
export const SOCKET_URL = API_BASE;
