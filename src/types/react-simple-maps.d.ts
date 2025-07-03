declare module 'react-simple-maps' {
  import React from 'react';

  export interface GeographyFeature {
    rsmKey?: string;
    type: string;
    properties: Record<string, unknown>;
    geometry: {
      type: string;
      coordinates: number[][][] | number[][][][] | number[][][][][] | number[][][][][][] | number[][][][][][][];
    };
    id?: string;
  }

  interface GeographyProps {
    geography: GeographyFeature;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    [key: string]: any;
  }

  interface GeographiesProps {
    geography: string | Record<string, unknown>;
    children: (props: { geographies: GeographyFeature[] }) => React.ReactNode;
    [key: string]: unknown;
  }

  interface ComposableMapProps {
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    [key: string]: unknown;
  }

  export const ComposableMap: React.FC<ComposableMapProps>;
  export const Geographies: React.FC<GeographiesProps>;
  export const Geography: React.FC<GeographyProps>;
}
