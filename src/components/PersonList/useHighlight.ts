import { RefObject, useEffect, useRef, useState } from 'react';

interface useHighlightProps {
  listRef: RefObject<HTMLElement>;
  highlightId?: string;
}

export const useHighlight = ({ listRef, highlightId }: useHighlightProps) => {
  const highlightIdRef = useRef(highlightId);
  const [highlightingId, setHighlightingId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const { current: highlightId } = highlightIdRef;

    if (highlightId) {
      const item = listRef.current?.querySelector(`[data-id="${highlightId}"]`);
      if (item) {
        const rect = item.getBoundingClientRect();
        const top = rect.top - (window.innerHeight >> 1) + (rect.height >> 1);
        window.scrollTo({ top, behavior: 'smooth' });

        setTimeout(() => {
          if (isMounted) {
            setHighlightingId(highlightId);
            setTimeout(() => isMounted && setHighlightingId(null), 1000);
          }
        }, 200);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [listRef]);

  return { highlightingId };
};
