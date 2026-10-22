// Yalnızca sunucuda çalışır: world-atlas ve d3-geo istemci paketine girmez.
import { geoConicConformal, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import type { Feature, FeatureCollection, MultiPoint } from "geojson";
import countries from "world-atlas/countries-50m.json";
import { cities, warehouse, type CityDef, type LabelSide } from "./cities";

const TURKEY_ID = "792";

export type ScenePoint = { x: number; y: number };

export type SceneCity = ScenePoint &
  Pick<CityDef, "id" | "name" | "weight" | "fill" | "meteo" | "meteoSide"> & { label: LabelSide };

export type SceneLayout = {
  width: number;
  height: number;
  /** Türkiye kontur yolu (SVG path, viewBox birimlerinde) */
  path: string;
  warehouse: ScenePoint & { label: LabelSide };
  cities: SceneCity[];
};

function turkeyFeature(): Feature {
  const topo = countries as unknown as Topology<{ countries: GeometryCollection }>;
  const all = feature(topo, topo.objects.countries) as FeatureCollection;
  const tr = all.features.find((f) => String(f.id) === TURKEY_ID);
  if (!tr) throw new Error("world-atlas içinde Türkiye (792) bulunamadı");
  return tr;
}

function baseProjection() {
  // Türkiye enlemlerine ayarlı konik projeksiyon: Mercator'dan daha doğal bir eğri verir.
  return geoConicConformal().parallels([37, 41]).rotate([-35, 0]);
}

const round = (n: number) => Math.round(n * 10) / 10;

function buildLayout(
  projection: ReturnType<typeof baseProjection>,
  width: number,
  height: number,
  defs: CityDef[],
): SceneLayout {
  const tr = turkeyFeature();
  const path = geoPath(projection).digits(1)(tr) ?? "";
  const project = (lon: number, lat: number): ScenePoint => {
    const p = projection([lon, lat]);
    if (!p) throw new Error(`Projeksiyon başarısız: ${lon}, ${lat}`);
    return { x: round(p[0]), y: round(p[1]) };
  };
  return {
    width,
    height,
    path,
    warehouse: { ...project(warehouse.lon, warehouse.lat), label: warehouse.label },
    cities: defs.map((c) => ({
      ...project(c.lon, c.lat),
      id: c.id,
      name: c.name,
      weight: c.weight,
      fill: c.fill,
      meteo: c.meteo,
      meteoSide: c.meteoSide,
      label: c.label,
    })),
  };
}

/** Masaüstü: tüm Türkiye kadraja sığar. */
function desktopLayout(): SceneLayout {
  const tr = turkeyFeature();
  const width = 1000;
  const pad = 36;
  const projection = baseProjection().fitWidth(width - pad * 2, tr);
  const [[x0, y0], [, y1]] = geoPath(projection).bounds(tr);
  const [tx, ty] = projection.translate();
  projection.translate([tx + pad - x0, ty + pad - y0]);
  const height = Math.ceil(y1 - y0 + pad * 2);
  return buildLayout(projection, width, height, cities);
}

/**
 * Mobil: kadraj mağazaların bulunduğu bölgeye yakınlaşır. Türkiye çok yatay
 * bir şekil olduğundan bu, dikey ekranda haritayı belirgin biçimde büyütür;
 * en doğu ve en batı uçları kırpılır.
 */
function mobileLayout(): SceneLayout {
  const defs = cities.filter((c) => c.mobile);
  const width = 1000;
  const height = 640;
  const focus: MultiPoint = {
    type: "MultiPoint",
    coordinates: [...defs.map((c) => [c.lon, c.lat]), [warehouse.lon, warehouse.lat]],
  };
  const projection = baseProjection().fitExtent(
    // Kenar boşlukları etiketlere yer bırakır (İzmir solda, Trabzon sağda).
    [
      [165, 120],
      [width - 95, height - 110],
    ],
    focus,
  );
  return buildLayout(projection, width, height, defs);
}

export function getTurkeyScene() {
  return { desktop: desktopLayout(), mobile: mobileLayout() };
}
