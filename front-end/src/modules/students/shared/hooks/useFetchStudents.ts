import { useEffect, useState } from "react";
import ApiService from "../../../../services/ApiService";
import { ENDPOINTS } from "../../../../services/endpoints";
import {  IStudentResponseData } from "../../interfaces/student";

interface IUseFetchStudents {
  page: number;
}

const useFetchStudents = ({page}:IUseFetchStudents) => {
  const [students, setStudents] = useState<IStudentResponseData|null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await ApiService.request<IStudentResponseData,null>('get',ENDPOINTS.getAllStudents+'?limit='+12+'&page='+page);
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, [page]);

  return { students, loading };
}

export default useFetchStudents;