import axios from "axios";
axios.defaults.withCredentials = true;

export const getABatchById = async (id: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/batches/get-single/${id}`
    );
    if (data.success) {
      return data.batch;
    }
  } catch (error) {
    console.error("Error getting batch:", error);
    return null;
  }
};
