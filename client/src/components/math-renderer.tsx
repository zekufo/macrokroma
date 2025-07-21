import { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathRendererProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
}

export default function MathRenderer({ latex, displayMode = false, className = '' }: MathRendererProps) {
  const mathRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (mathRef.current && latex) {
      try {
        katex.render(latex, mathRef.current, {
          displayMode,
          throwOnError: false,
          errorColor: '#cc0000',
        });
      } catch (error) {
        console.error('KaTeX rendering error:', error);
        if (mathRef.current) {
          mathRef.current.textContent = `Math Error: ${latex}`;
        }
      }
    }
  }, [latex, displayMode]);

  return <span ref={mathRef} className={className} />;
}