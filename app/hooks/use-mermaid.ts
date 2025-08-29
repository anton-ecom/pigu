import { useEffect, RefObject } from "react";
import mermaid from "mermaid";

export function useMermaid(
  containerRef?: RefObject<HTMLElement>,
  shouldRender: boolean = true,
) {
  useEffect(() => {
    // Initialize mermaid with proper configuration
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      securityLevel: "loose",
      // Add any other necessary configuration
      flowchart: {
        htmlLabels: true,
        curve: "basis",
      },
    });

    // Only run if shouldRender is true
    if (!shouldRender) return;

    const processMermaid = async () => {
      try {
        // Find all mermaid code blocks within the container
        const element = containerRef?.current || document;
        const mermaidDivs = element.querySelectorAll(".mermaid");

        //console.log(`Found ${mermaidDivs.length} mermaid diagrams`);

        // Process each mermaid div
        for (const div of mermaidDivs) {
          try {
            const id = `mermaid-${Math.random().toString(36).substring(2, 10)}`;
            const textContent = div.textContent || "";
            //console.log('Rendering mermaid:', textContent);

            // Use mermaid's render function to generate SVG
            const { svg } = await mermaid.render(id, textContent);
            //console.log('Generated SVG:', svg ? 'success' : 'failed');

            // Replace the original content with the rendered SVG
            div.innerHTML = svg;

            // Add styling class
            div.classList.add("mermaid-rendered");
          } catch (err) {
            console.error("Error rendering diagram:", err);
          }
        }
      } catch (error) {
        console.error("Mermaid rendering error:", error);
      }
    };
    processMermaid();

    // Add a small delay to ensure DOM is fully updated
    const timer = setTimeout(() => {
      processMermaid();
    }, 10); // Increased timeout to ensure DOM is ready

    return () => clearTimeout(timer);
  }, [containerRef, shouldRender]);
}
