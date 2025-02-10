import { useEffect, useState } from "react";

import {  IStudentResponseData } from "../../interfaces/student";
import { fetchStudents } from "../../core/use-case/create-user";

interface IUseFetchStudents {
  page: number;
}

const useFetchStudents = ({page}:IUseFetchStudents) => {
  const [students, setStudents] = useState<IStudentResponseData|null>(null);
  useEffect(() => {
    fetchStudents(page).then(data => {
      setStudents(data);
    });
  }, [page]);

  return { students };
}

export default useFetchStudents;