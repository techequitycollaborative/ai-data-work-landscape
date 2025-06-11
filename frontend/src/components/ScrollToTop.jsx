// ScrollToTop.jsx
// This component ensures that in-line text hyperlinks linking to another page render the page from the top (not in the middle of the page)
 
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
