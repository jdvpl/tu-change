import ApiService from "../../../../services/ApiService";
import { ENDPOINTS } from "../../../../services/endpoints";
import { IStudent } from "../../interfaces/student";

export const createUser= async (data: IStudent): Promise<IStudent> => {
  data.grade=+data.grade;
  const response = await ApiService.request('post', ENDPOINTS.createStudent, data);
  return response.data as IStudent;
}