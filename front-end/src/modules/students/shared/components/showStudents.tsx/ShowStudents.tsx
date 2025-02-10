import { useState, Suspense } from "react";
import useFetchStudents from "../../hooks/useFetchStudents";
import { IStudentResponseData } from "../../../interfaces/student";

const ShowStudents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { students } = useFetchStudents({ page: currentPage });

  if (!students?.data) return null;

  const { data, lastPage, totalStudents, perPage } = students as IStudentResponseData;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= lastPage) {
      setCurrentPage(newPage);
    }
  };


  return (
    <Suspense fallback={<p className="text-center text-gray-500">Cargando...</p>}>
      <div className="lg:max-w-4xl md:max-w-[400px] max-w-xs mx-auto ">
        <h2 className="text-2xl font-bold text-center mb-4">Lista de Estudiantes</h2>

        <p className="text-center text-gray-700 mb-4">
          Mostrando <b>{perPage}</b> estudiantes de un total de <b>{totalStudents}</b>
        </p>

        <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full overflow-x-auto text-sm text-left text-gray-600">
            <thead className="text-xs text-white uppercase bg-blue-600">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Nombre Madre</th>
                <th className="px-4 py-2">Nombre paadre</th>
                <th className="px-4 py-2">Fecha de Admisión</th>
                <th className="px-4 py-2">Fecha de Nacimiento</th>
                <th className="px-4 py-2">Grado</th>
                <th className="px-4 py-2">Sección</th>
              </tr>
            </thead>
            <tbody>
              {data.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{student.studentName}</td>
                  <td className="px-4 py-2">{student.motherName}</td>
                  <td className="px-4 py-2">{student.fatherName}</td>
                  <td className="px-4 py-2">{student.admissionDate}</td>
                  <td className="px-4 py-2">{student.birthDate}</td>
                  <td className="px-4 py-2">{student.gradeCode}</td>
                  <td className="px-4 py-2">{student.gradeSection}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6 w-full">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-gray-700">
            Página {currentPage} de {lastPage}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === lastPage}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default ShowStudents;
