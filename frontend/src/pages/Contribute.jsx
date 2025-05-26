// Contribute.jsx

export default function Contribute() {
    return (
      <section id="contribute" className="h-screen snap-start flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl mb-6">Contribute</h1>
        <p className="mb-4">Help us improve the dataset by submitting information about companies and their data work.</p>
            <form action="http://localhost:8000/submit" method="POST" className="flex flex-col gap-4 w-full max-w-md">
                <input name="company_name" placeholder="Company Name" className="p-2 border rounded" required />
                <input name="company_headquarters" placeholder="Headquarters" className="p-2 border rounded" />
                <input name="type_of_company_by_product" placeholder="Company Type" className="p-2 border rounded" />
                <input name="workforce_model" placeholder="Workforce Model" className="p-2 border rounded" />
                <input name="in_house_marketplace_name" placeholder="In-House Marketplace" className="p-2 border rounded" />
                <input name="in_house_marketplace_details" placeholder="Marketplace details" className="p-2 border rounded" />
                <input name="product_project_assisted_by_data_workers" placeholder="Type of Work Done" className="p-2 border rounded" />
                <input name="known_worker_locations" placeholder="Known Worker Locations" className="p-2 border rounded" />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">Submit</button>
            </form>
      </section>
    );
  }
  