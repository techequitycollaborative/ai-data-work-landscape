// Scroll.jsx
// This page will house content for the scrollable sections of the microsite

// Use "9xl" for large text and "6xl" for medium text in headers

import { useEffect, useState } from "react";

export default function ScrollPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/data")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <main className="snap-y snap-mandatory h-screen overflow-y-scroll">
      <section id="home" className="h-screen snap-start flex items-center justify-center">
        <h1 className="text-9xl">Who Powers AI?</h1>
      </section>

      <section id="data" className="h-screen snap-start flex flex-col items-center justify-center p-8">
        <h1 className="text-6xl mb-4">Data</h1>
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

      <section id="contribute" className="h-screen snap-start flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl mb-4">Contribute</h1>
        <form action="http://localhost:8000/submit" method="POST" className="flex flex-col gap-4">
          <input name="name" placeholder="Your Name" className="p-2 border rounded" required />
          <input name="value" placeholder="Value" className="p-2 border rounded" required />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">Submit</button>
        </form>
      </section>
    </main>
  );
}
