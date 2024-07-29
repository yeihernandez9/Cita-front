
interface Doctor {
  id: number;
  name: string;
  email: string;
  description: string;
}

export const GetDoctor = async (url: string, token: string): Promise<Doctor[] | null> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const doctors: Doctor[] = await response.json();
    return doctors;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return null;
  }
};