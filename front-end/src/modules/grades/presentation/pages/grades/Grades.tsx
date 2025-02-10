import useFetchGrades from "../../../../../shared/hooks/useFetchGrades"

const Grades = () => {
  const {gradesSections}=useFetchGrades()

  console.log(gradesSections);
  return (
    <div className="min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-4">Grados</h2>
      <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg max-w-md mx-auto">
        <table className="w-full overflow-x-auto text-sm text-left text-gray-600">
          <thead className="text-xs text-white uppercase bg-blue-600">
            <tr>
              <th className="px-4 py-2">Grado</th>
              <th className="px-4 py-2">Sección</th>
            </tr>
          </thead>
          <tbody>
            {gradesSections.map((gradeSection) => (
              <tr key={gradeSection.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{gradeSection.code}</td>
                <td className="px-4 py-2">{gradeSection.section}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
    </div>
  )
}

export default Grades