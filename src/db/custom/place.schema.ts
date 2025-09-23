import { z } from 'zod';

export const GoogleMapsPlaceGeometry = z.object({
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  viewport: z.object({
    north: z.number(),
    south: z.number(),
    east: z.number(),
    west: z.number(),
  }),
});

export const GoogleMapsPlace = z.object({
  place_id: z.string(),
  name: z.string(),
  geometry: GoogleMapsPlaceGeometry,
  html_attributions: z.array(z.string()),
});
