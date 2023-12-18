import axios from "axios";

export interface Contents{
	_id: string,
	title: string,
	description: string,
	
}

const axiosInstance = ()=> {
    return axios.create({
      baseURL: 'https://mern-be-xpfl.onrender.com/api/content',
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