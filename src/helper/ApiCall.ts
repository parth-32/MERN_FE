import axios from "axios";

export interface Contents{
	_id: string,
	title: string,
	description: string,
	
}

const axiosInstance = ()=> {
    return axios.create({
      baseURL: 'http://localhost:3001/api/content',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

export const getContents = async (): Promise<Contents[]> => {
	const result = await axiosInstance().get("/");

	return result.data.data;
};

export const addData = async (data: { title: string, description: string }) => {
	const result = await axiosInstance().post("/", data);

	return result.data.data;
};

export const deleteData = async (id: string) => {
	const result = await axiosInstance().delete(`/${id}`);

	return result.data.data;
};