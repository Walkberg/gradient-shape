import type { ShapeParams } from "../providers/GradientStudioProvider";

export class ShapeParamsFactory {
  static getDefaultParams(shapeId: string): ShapeParams {
    switch (shapeId) {
      case "star":
        return { starSpikes: 5, starInnerRadius: 50 };
      case "blob":
        return { blobPoints: 8, blobVariation: 40 };
      case "arrow-up":
        return { arrowBodyWidth: 30, arrowHeadWidth: 70 };
      default:
        return {};
    }
  }

  static getRandomParams(shapeId: string): ShapeParams {
    switch (shapeId) {
      case "star":
        return {
          starSpikes: Math.floor(Math.random() * 10) + 3,
          starInnerRadius: Math.floor(Math.random() * 61) + 20,
        };
      case "blob":
        return {
          blobPoints: Math.floor(Math.random() * 13) + 4,
          blobVariation: Math.floor(Math.random() * 81),
        };
      case "arrow-up":
        return {
          arrowBodyWidth: Math.floor(Math.random() * 51) + 10,
          arrowHeadWidth: Math.floor(Math.random() * 61) + 40,
        };
      default:
        return {};
    }
  }
}
