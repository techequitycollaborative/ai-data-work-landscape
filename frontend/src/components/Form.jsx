// Form.jsx
// Component for the form on the input page (Jotform embed), with caching functionality to improve loading performance

import { useState, useEffect, useRef, memo } from 'react';

// Global cache for iframe elements
const iframeCache = new Map();
const loadingStates = new Map();

const CachedJotForm = memo(function CachedJotForm({ 
  src, 
  title = "Form", 
  width = "100%", 
  height = "800px", 
  className = "" 
}) {
  const [isLoading, setIsLoading] = useState(!iframeCache.has(src));
  const containerRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if iframe is already cached
    const cachedIframe = iframeCache.get(src);
    
    if (cachedIframe) {
      // Move cached iframe to current container
      if (cachedIframe.parentNode) {
        cachedIframe.parentNode.removeChild(cachedIframe);
      }
      container.appendChild(cachedIframe);
      
      // Update loading state
      if (mountedRef.current) {
        setIsLoading(false);
      }
      
      return;
    }

    // Create new iframe if not cached
    if (mountedRef.current) {
      setIsLoading(true);
    }

    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = title;
    iframe.width = width;
    iframe.height = height;
    iframe.frameBorder = '0';
    iframe.scrolling = 'auto';
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.border = '0';

    // Handle iframe load
    iframe.onload = () => {
      if (mountedRef.current) {
        setIsLoading(false);
        // Cache the iframe after it loads
        iframeCache.set(src, iframe);
      }
    };

    // Add iframe to container
    container.appendChild(iframe);

    // Cleanup function
    return () => {
      // Don't remove iframe from DOM on unmount - keep it cached
      // Just remove from current container if it's still there
      if (iframe.parentNode === container) {
        container.removeChild(iframe);
      }
    };
  }, [src, title, width, height]);

  return (
    <div className={`relative ${className}`}>
      {/* Loading spinner */}
      {isLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10"
          style={{ height }}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600">Loading form...</p>
          </div>
        </div>
      )}
      
      {/* Container for iframe */}
      <div 
        ref={containerRef}
        className="w-full"
        style={{ minHeight: height }}
      />
    </div>
  );
});

export default CachedJotForm;