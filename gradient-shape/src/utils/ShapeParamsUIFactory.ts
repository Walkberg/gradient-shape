import type { ShapeParams } from "../providers/GradientStudioProvider";

export interface ParamDefinition {
  key: keyof ShapeParams;
  label: string;
  min: number;
  max: number;
  unit?: string;
}

export interface ShapeParamsConfig {
  title: string;
  params: ParamDefinition[];
}

export class ShapeParamsUIFactory {
  private static readonly configs: Record<string, ShapeParamsConfig> = {
    star: {
      title: "Paramètres Étoile",
      params: [
        { key: "starSpikes", label: "BRANCHES", min: 3, max: 12 },
        {
          key: "starInnerRadius",
          label: "PROFONDEUR",
          min: 20,
          max: 80,
          unit: "%",
        },
      ],
    },
    star6: {
      title: "Paramètres Étoile",
      params: [
        { key: "starSpikes", label: "BRANCHES", min: 3, max: 12 },
        {
          key: "starInnerRadius",
          label: "PROFONDEUR",
          min: 20,
          max: 80,
          unit: "%",
        },
      ],
    },
    star8: {
      title: "Paramètres Étoile",
      params: [
        { key: "starSpikes", label: "BRANCHES", min: 3, max: 12 },
        {
          key: "starInnerRadius",
          label: "PROFONDEUR",
          min: 20,
          max: 80,
          unit: "%",
        },
      ],
    },
    blob: {
      title: "Paramètres Blob",
      params: [
        { key: "blobPoints", label: "POINTS", min: 4, max: 16 },
        {
          key: "blobVariation",
          label: "VARIATION",
          min: 0,
          max: 80,
          unit: "%",
        },
      ],
    },
    "arrow-up": {
      title: "Paramètres Flèche",
      params: [
        {
          key: "arrowBodyWidth",
          label: "LARGEUR CORPS",
          min: 10,
          max: 60,
          unit: "%",
        },
        {
          key: "arrowHeadWidth",
          label: "LARGEUR TÊTE",
          min: 40,
          max: 100,
          unit: "%",
        },
      ],
    },
    "arrow-right": {
      title: "Paramètres Flèche",
      params: [
        {
          key: "arrowBodyWidth",
          label: "LARGEUR CORPS",
          min: 10,
          max: 60,
          unit: "%",
        },
        {
          key: "arrowHeadWidth",
          label: "LARGEUR TÊTE",
          min: 40,
          max: 100,
          unit: "%",
        },
      ],
    },
  };

  static getConfig(shapeId: string): ShapeParamsConfig | null {
    return this.configs[shapeId] || null;
  }

  static hasParams(shapeId: string): boolean {
    return shapeId in this.configs;
  }
}
