import { BASE_URL } from "./constants";

export const fetchData = async () => {
    try {
        const response = await fetch(`${BASE_URL}/benirvingplt/products/products`);
        if (!response.ok) {
            throw new Error('Error fetching data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
