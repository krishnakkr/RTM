// Data source: https://open.toronto.ca/dataset/street-tree-data/

type RawDumpyard = [string, number, number];

type Dumpyard = {
  key: string;
  name: string;
  lat: number;
  lng: number;
};

const dumpyards: RawDumpyard[] = [
  ["Hsr Layout", 12.913938700584378, 77.6453074477682],
  ["Bellandur", 12.930590958286524, 77.67772388480336],
  ["IndiraNagar", 12.97940397100524, 77.63965734638087],
  ["Shivaji Nagar", 12.986145433098757, 77.60494289841279],
  ["Rajaji Nagar", 12.998480168950087, 77.55286920358692],
];

const dumpyardformatted: Dumpyard[] = dumpyards.map(([name, lat, lng]) => ({
  name,
  lat,
  lng,
  key: JSON.stringify({ name, lat, lng }),
}));

export default dumpyardformatted;
