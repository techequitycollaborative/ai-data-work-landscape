// Footer.jsx
// Footer component for the website, featuring privacy policy and trademark

export default function Footer() {
    return (
      <footer 
      id="myFooter"
      className="bg-white text-center text-gray-400 py-6 border-t mt-10">
        <p>
          <a href="https://techequity.us/privacy-policy/" className="hover:text-gray-800" target="_blank" rel="noopener noreferrer">Privacy Policy</a>    |    <a href=" https://techequity.us/code-of-conduct/" className="hover:text-gray-800" target="_blank" rel="noopener noreferrer">Terms of Use</a>    |    © 2025 TechEquity. All Rights Reserved.
        </p>
      </footer>
    );
  }

 