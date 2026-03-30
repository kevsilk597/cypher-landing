import type { CSSProperties, ReactNode } from 'react';

interface PrismaticBorderProps {
  children: ReactNode;
  borderRadius?: string;
  borderWidth?: number;
  opacity?: number;
  style?: CSSProperties;
  className?: string;
}

export default function PrismaticBorder({
  children,
  borderRadius = '8px',
  borderWidth = 2,
  opacity = 0.75,
  style,
  className,
}: PrismaticBorderProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        borderRadius,
        display: 'inline-block',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: -borderWidth,
          borderRadius: `calc(${borderRadius} + ${borderWidth}px)`,
          background: 'conic-gradient(from 0deg, #4A90D9, #E8A4B8, #A4B8E8, #2F6FAE, #4A90D9)',
          animation: 'prismatic-spin 8s linear infinite',
          opacity,
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, borderRadius }}>
        {children}
      </div>
    </div>
  );
}
