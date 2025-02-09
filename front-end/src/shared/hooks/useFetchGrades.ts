import { useEffect, useState } from "react";
import {  GradeSection } from "../interfaces/grades";
import ApiService from "../../services/ApiService";
import { ENDPOINTS } from "../../services/endpoints";

export default function useFetchGrades() {
  const [grades, setGrades] = useState<number[]>([]);
  const [sections, setSections] = useState<string[]>([]);

  const getGrades = async () => {
    try {
      const { data } = await ApiService.request<GradeSection[],null>('get', ENDPOINTS.getAllGrades)
      const uniqueCodes = [...new Set(data.flatMap(item => Number(item.code)))].sort((a, b) => a - b);
      const uniqueSections = [...new Set(data.flatMap(item => item.section))].sort();
      setGrades(uniqueCodes);
      setSections(uniqueSections);
    } catch (error: unknown) {
      throw new Error(String(error))
    }
  }

  useEffect(() => {
    getGrades()
  }, []);

  return { grades, sections,  };
}