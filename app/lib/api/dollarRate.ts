import { BASE_URL } from "./apiRequests";

export async function getCourse() {
    try {
        const response = await fetch(`${BASE_URL}/api/cms/getCourse`);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        const course = {
            date: data["дата"],
            name: data["наименование"],
            rate: parseFloat(data["курс, грн."].replace(",", ".")),
        };

        return course;
    } catch (error) {
        console.error("Error fetching course:", error);
        return null;
    }
}
