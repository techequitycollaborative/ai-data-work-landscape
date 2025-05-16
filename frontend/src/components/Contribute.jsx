export default function Contribute() {
    return (
      <section id="contribute" className="h-screen snap-start flex flex-col items-center justify-center bg-pink-100 p-8">
        <h1 className="text-4xl mb-4">Contribute</h1>
        <form action="http://localhost:8000/submit" method="POST" className="flex flex-col gap-4">
          <input name="name" placeholder="Your Name" className="p-2 border rounded" required />
          <input name="value" placeholder="Value" className="p-2 border rounded" required />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">Submit</button>
        </form>
      </section>
    );
  }
  