import ApiService from "../../../../services/ApiService";
import { ENDPOINTS } from "../../../../services/endpoints";
import { IStudent, IStudentResponse } from "../../interfaces/student";

export const createUser = async (data: IStudent): Promise<IStudent> => {
  try {
    data.grade = +data.grade;
    const response = await ApiService.request(
      "post",
      ENDPOINTS.createStudent,
      data,
    );
    return response.data as IStudent;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const getStudentsByGrade = async (grade: string, section?: string):Promise<IStudentResponse[]> => {
  try {
    const sectionParams = section ? `/${section}`:'';
    const params = `${grade}${sectionParams}`;
    const { data } = await ApiService.request(
      "get",
      `${ENDPOINTS.getStudentByGrade}${params}`,
    );
    return data as IStudentResponse[];
  } catch (error) {
    throw new Error(String(error));
  }
};
