import { useEffect } from "react";
import { healthServer } from "../api/health";

export const useHealth = () => {
    useEffect(() => {
        const wakeUpServer = async () => {
            try {
                await healthServer();
                console.log('Server is ready!');
            } catch (err) {
                console.error('Waking up server...', err);
            }
        }

        wakeUpServer();
    }, [])
};