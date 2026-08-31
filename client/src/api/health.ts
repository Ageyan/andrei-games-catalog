import api from "./api";

export const healthServer = async (): Promise<void> => {
    await api.get('/api/health');
};