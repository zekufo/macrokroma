import { useEffect, useRef } from 'react';
import katex from 'katex';

interface PostContentProps {
  content: string;
  className?: string;
}

export default function PostContent({ content, className = '' }: PostContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Set the HTML content
      contentRef.current.innerHTML = content;

      // Find and render all math expressions
      const mathElements = contentRef.current.querySelectorAll('span[data-math]');
      mathElements.forEach((element) => {
        const latex = element.getAttribute('data-math');
        const isDisplay = element.hasAttribute('data-display');
        
        if (latex) {
          try {
            katex.render(latex, element as HTMLElement, {
              displayMode: isDisplay,
              throwOnError: false,
              errorColor: '#cc0000',
            });
          } catch (error) {
            console.error('KaTeX rendering error:', error);
            element.textContent = `Math Error: ${latex}`;
          }
        }
      });

      // Process inline math ($...$) and display math ($$...$$)
      const processedContent = content
        .replace(/\$\$([^$]+?)\$\$/g, (match, latex) => {
          try {
            return katex.renderToString(latex.trim(), {
              displayMode: true,
              throwOnError: false,
              errorColor: '#cc0000',
            });
          } catch (error) {
            return `<span style="color: #cc0000;">Math Error: ${latex}</span>`;
          }
        })
        .replace(/\$([^$]+?)\$/g, (match, latex) => {
          try {
            return katex.renderToString(latex.trim(), {
              displayMode: false,
              throwOnError: false,
              errorColor: '#cc0000',
            });
          } catch (error) {
            return `<span style="color: #cc0000;">Math Error: ${latex}</span>`;
          }
        });

      contentRef.current.innerHTML = processedContent;
    }
  }, [content]);

  return (
    <div 
      ref={contentRef}
      className={`prose max-w-none ${className}`}
      style={{ 
        lineHeight: '1.6',
        fontSize: '16px',
      }}
    />
  );
}