'use client';

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export interface PreviewPreset {
  label: string;
  width: number;
  height: number;
}

interface SectionPreviewFrameProps {
  preset: PreviewPreset;
  children: ReactNode;
}

export function SectionPreviewFrame({
  preset,
  children,
}: SectionPreviewFrameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const nextEntry = entries[0];
      if (!nextEntry) {
        return;
      }

      setContainerSize({
        width: nextEntry.contentRect.width,
        height: nextEntry.contentRect.height,
      });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const scale = useMemo(() => {
    if (containerSize.width <= 0 || containerSize.height <= 0) {
      return 1;
    }

    const horizontalPadding = 32;
    const verticalPadding = 32;
    const widthScale = (containerSize.width - horizontalPadding) / preset.width;
    const heightScale =
      (containerSize.height - verticalPadding) / preset.height;

    return Math.min(1, widthScale, heightScale);
  }, [containerSize.height, containerSize.width, preset.height, preset.width]);

  const frameStyle: CSSProperties = {
    width: preset.width,
    height: preset.height,
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
  };

  return (
    <div
      ref={containerRef}
      className="h-[72vh] min-h-[440px] w-full overflow-auto rounded-xl border border-border bg-slate-100/70 p-4"
    >
      <div className="flex min-h-full min-w-full items-start justify-center">
        <div
          className="shrink-0"
          style={{
            width: preset.width * scale,
            height: preset.height * scale,
          }}
        >
          <div
            className="overflow-hidden rounded-md border border-slate-300 bg-white shadow"
            style={frameStyle}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
