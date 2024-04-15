// Data source: https://open.toronto.ca/dataset/street-tree-data/

type RawUltrasonic = [number];

type Ultrasonic = {
  key: string;
  name: number;
};

const ultrasonics: RawUltrasonic[] = [
  [10], [20], [30], [36], [46]
];

const ultrasonicformatted: Ultrasonic[] = ultrasonics.map(([value]) => ({
  name: value,
  key: value.toString()
}));

export default ultrasonicformatted;
