export default function Data({ data }) {
    return (
      <section id="data" className="h-screen snap-start flex flex-col items-center justify-center bg-yellow-100 p-8">
        <h1 className="text-4xl mb-4">Data</h1>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
  