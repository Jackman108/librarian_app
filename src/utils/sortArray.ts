// src/utils/sortArray.ts
type Sortable = Record<string, string | number>;

const sortArray = <T extends Sortable>(
  array: T[],
  key: keyof T,
  order: 'asc' | 'desc'
): T[] => {
  return [...array].sort((a, b) => {
    const valueA = a[key] as string | number;
    const valueB = b[key] as string | number;

    if (valueA === valueB) return 0;

    if (order === 'asc') {
      return valueA < valueB ? -1 : 1;
    } else {
      return valueA > valueB ? -1 : 1;
    }
  });
};

export default sortArray;
