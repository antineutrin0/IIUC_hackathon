import axios from "axios";

export async function fetchRoadmap(userId, jobId) {
  try {
    const response = await axios.post(
      "https://iiuc-hackathon-backend.vercel.app/roadmap",
      {
        userId,
        jobId,
      },
    );

    return response.data; // Axios returns parsed JSON automatically
  } catch (error) {
    console.error("Error fetching roadmap:", error);
    throw new Error("Failed to fetch roadmap");
  }
}
