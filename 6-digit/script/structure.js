const root = document.documentElement;
const caseHeight = getComputedStyle(root)
  .getPropertyValue("--caseHeight")
  .trim();

const caseWidth = getComputedStyle(root).getPropertyValue("--caseWidth").trim();

const segmentSeparation = getComputedStyle(root)
  .getPropertyValue("--segmentSeparation")
  .trim();
const segmentWidth = caseWidth / 4;

const segmentHeight = segmentWidth;

const segmentType = {
  A: {
    //aucun segment
    x: 0,
    y: 0,
    width: 0,
    heigh: 0,
  },
  B: {
    //segment inferieur /
    x: caseWidth / 2 - segmentWidth / 2,
    y: 0,
    width: segmentWidth,
    height: caseHeight / 2 - segmentSeparation,
  },
  C: {
    //segment superieur /
    x: caseWidth / 2 - segmentWidth / 2,
    y: caseHeight / 2 + segmentSeparation / 2,
    width: segmentWidth,
    height: caseHeight / 2 - segmentSeparation / 2,
  },
  D: {
    //segment gauche /
    x: 0,
    y: caseHeight / 2 - segmentHeight / 2 - 7,
    width: caseWidth / 2 - segmentSeparation / 2,
    height: segmentHeight,
  },
  E: {
    //segment droit /
    x: caseWidth / 2 + segmentSeparation / 2,
    y: caseHeight / 2 - segmentHeight / 2 - 7,
    width: caseWidth / 2 - segmentSeparation / 2,
    height: segmentHeight,
  },
};






const carte = {
  1: {
    image: "1.jpg",
    structure: [
      "A",
      "A",
      "C",
      "A",
      "A",
      "A",
      "A",
      "BC",
      "A",
      "A",
      "A",
      "A",
      "BC",
      "A",
      "A",
      "A",
      "A",
      "BC",
      "A",
      "A",
      "A",
      "A",
      "BC",
      "A",
      "A",
      "A",
      "A",
      "B",
      "A",
      "A",
    ],
    voisins: [2, 3, 4],
  },
  2: {
    image: "2.jpg",
    structure: [
      "A",
      "A",
      "C",
      "A",
      "A",
      "A",
      "A",
      "BC",
      "A",
      "A",
      "A",
      "A",
      "BC",
      "A",
      "A",
      "A",
      "A",
      "BC",
      "A",
      "A",
      "A",
      "A",
      "BE",
      "D",
      "A",
      "A",
      "A",
      "A",
      "A",
      "A",
    ],
    voisins: [1, 3, 4, 9, 16, 19, 26, 33, 34, 39, 54],
  },
  3: {
    image: "3.jpg",
    structure: [
      "",
      "",
      "C",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "BCE",
      "D",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [1, 2, 4, 8, 9, 10, 12, 16, 19, 24, 26, 28, 33, 34, 39, 47, 54],
  },
  4: {
    image: "4.jpg",
    structure: [
      "",
      "",
      "C",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "E",
      "BCD",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [1, 2, 3, 8, 24, 26, 28, 37, 39, 47, 53],
  },
  5: {
    image: "5.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "C",
      "BC",
      "",
      "",
      "E",
      "BDE",
      "BD",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ],
    voisins: [6, 11, 13, 15, 19, 20, 21, 22, 24, 27, 37, 38, 40, 43, 44, 46, 48, 52, 54, 55],
  },
  6: {
    image: "6.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "EC",
      "DC",
      "",
      "",
      "",
      "BC",
      "B",
      "",
      "",
      "",
      "BE",
      "D",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [10, 11, 13, 15, 17, 20, 21, 22, 27, 31, 37, 44, 46],
  },
  7: {
    image: "7.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "BE",
      "DC",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "B",
      "",
      "",
    ],
    voisins: [8, 14, 18, 34, 36, 42, 55],
  },
  8: {
    image: "8.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "BCE",
      "DC",
      "",
      "",
      "",
      "B",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [3, 4, 7, 10, 14, 18, 17, 19, 26, 28, 32, 34, 42, 45, 47, 50, 52, 55],
  },
  9: {
    image: "9.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "E",
      "DEC",
      "D",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [2, 3, 10, 16, 22, 26, 30, 31, 33, 34, 39, 41, 47, 53, 54],
  },
  10: {
    image: "10.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "CE",
      "D",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "BCE",
      "D",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [3, 4, 6, 8, 9, 11, 12, 17, 24, 28, 31, 33, 39, 44, 53],
  },
  11: {
    image: "11.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "EC",
      "BDE",
      "DC",
      "",
      "",
      "B",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [5, 6, 10, 13, 17, 26, 28, 30, 31, 38, 40, 41, 44, 46, 50],
  },
  12: {
    image: "12.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "CE",
      "BCD",
      "",
      "",
      "",
      "B",
      "BC",
      "",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [3, 4, 10, 15, 19, 28, 35, 37, 39, 40, 41, 45, 47, 52],
  },
  13: {
    image: "13.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "C",
      "",
      "",
      "BE",
      "DE",
      "DB",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [5, 6, 10, 11, 17, 19, 29, 31, 43, 44, 54],
  },
  14: {
    image: "14.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "E",
      "DC",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "BE",
      "DC",
      "",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [7, 8, 18, 20, 21, 22, 26, 27, 31, 37, 38, 39, 42, 46, 52],
  },
  15: {
    image: "15.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "EC",
      "DC",
      "",
      "",
      "",
      "BC",
      "BC",
      "",
      "",
      "",
      "B",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [5, 6, 12, 20, 21, 22, 26, 27, 33, 34, 37, 45, 46, 48, 52],
  },
  16: {
    image: "16.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "E",
      "DC",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "BE",
      "D",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [2, 3, 9, 26, 33, 34, 39, 54],
  },
  17: {
    image: "17.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "",
      "BE",
      "DC",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "E",
      "DB",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [6, 8, 10, 11, 13, 31, 34, 36, 44, 55],
  },
  18: {
    image: "18.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "E",
      "BCD",
      "",
      "",
      "",
      "",
      "BE",
      "DC",
      "",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [7, 8, 11, 14, 17, 28, 32, 35, 36, 38, 39, 40, 41, 42, 43],
  },
  19: {
    image: "19.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "BEC",
      "DE",
      "D",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [3, 4, 5, 8, 10, 12, 13, 22, 28, 29, 30, 43, 47],
  },
  20: {
    image: "20.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "C",
      "BC",
      "",
      "",
      "",
      "EB",
      "BD",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [2, 3, 5, 6, 9, 10, 15, 21, 27, 33, 37, 46, 53],
  },
  21: {
    image: "21.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "E",
      "CD",
      "BC",
      "",
      "",
      "",
      "EB",
      "BD",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [5, 6, 15, 20, 25, 27, 37, 46, 51],
  },
  22: {
    image: "22.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "E",
      "DCE",
      "DC",
      "",
      "",
      "",
      "BC",
      "B",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [5, 6, 9, 15, 20, 21, 24, 27, 30, 31, 37, 41, 44, 46, 47, 53],
  },
  23: {
    image: "23.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "",
      "BE",
      "DC",
      "",
      "",
      "",
      "",
      "BE",
      "DC",
      "",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [18, 25, 32, 35, 36],
  },
  24: {
    image: "24.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "E",
      "BCD",
      "",
      "",
      "",
      "E",
      "BCD",
      "",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [3, 4, 5, 10, 19, 22, 26, 28, 38, 39, 40, 41, 44, 47, 48, 52, 53, 55],
  },
  25: {
    image: "25.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "",
      "BE",
      "DC",
      "C",
      "",
      "",
      "",
      "BE",
      "DB",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [21, 23, 48, 51],
  },
  26: {
    image: "26.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "E",
      "DC",
      "",
      "",
      "",
      "",
      "BEC",
      "D",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [2, 3, 4, 9, 11, 16, 24, 28, 30, 32, 33, 34, 39, 40, 41, 43, 47, 53, 54],
  },
  27: {
    image: "27.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "CE",
      "D",
      "",
      "",
      "C",
      "CB",
      "",
      "",
      "",
      "BE",
      "BD",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [5, 6, 15, 20, 21, 22, 29, 37, 46],
  },
  28: {
    image: "28.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "E",
      "BCD",
      "",
      "",
      "",
      "",
      "BCE",
      "D",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [3, 4, 8, 10, 11, 12, 18, 19, 24, 26, 32, 38, 39, 41, 43, 47],
  },
  29: {
    image: "29.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "BE",
      "DE",
      "DC",
      "",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [13, 19, 27, 43, 54],
  },
  30: {
    image: "30.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "E",
      "DCE",
      "DB",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [9, 19, 26, 28, 32, 41, 43, 47],
  },
  31: {
    image: "31.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "E",
      "DC",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "E",
      "DBE",
      "D",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [6, 9, 10, 11, 13, 14, 17, 22, 38, 39, 41, 44, 47],
  },
  32: {
    image: "32.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "E",
      "DC",
      "",
      "",
      "",
      "",
      "BEC",
      "DC",
      "",
      "",
      "",
      "B",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [, 8, 18, 23, 26, 28, 30, 36, 45, 50, 52],
  },
  33: {
    image: "33.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "E",
      "DC",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "E",
      "DB",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [2, 3, 9, 10, 16, 26, 34, 39, 53, 54],
  },
  34: {
    image: "34.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "",
      "BE",
      "DC",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "Bs",
      "",
    ],
    voisins: [2, 3, 7, 8, 9, 16, 17, 26, 33, 36, 54],
  },
  35: {
    image: "35.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "E",
      "DCE",
      "D",
      "",
      "",
      "",
      "BE",
      "DC",
      "",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [12, 18, 36, 40, 41, 42, 45, 48, 49, 51, 52],
  },
  36: {
    image: "36.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "E",
      "DC",
      "",
      "",
      "",
      "",
      "BE",
      "DC",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [7, 17, 23, 32, 34, 35, 55],
  },
  37: {
    image: "37.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "C",
      "BC",
      "",
      "",
      "",
      "BEC",
      "BD",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [5, 6, 15, 20, 21, 27, 40, 41, 45, 48],
  },
  38: {
    image: "38.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "E",
      "DC",
      "",
      "",
      "",
      "E",
      "BDC",
      "",
      "",
      "",
      "",
      "BE",
      "D",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [5, 11, 14, 18, 24, 28, 31, 39, 40, 43, 44, 48, 52, 55],
  },
  39: {
    image: "39.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "E",
      "DBC",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "BE",
      "D",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [2, 3, 4, 9, 10, 12, 14, 16, 24, 26, 28, 31, 33, 38, 47],
  },
  40: {
    image: "40.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "E",
      "BCDE",
      "D",
      "",
      "",
      "",
      "BE",
      "D",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [5, 11, 18, 24, 26, 35, 37, 38, 41, 43, 44, 45, 47, 48, 52, 55],
  },
  41: {
    image: "41.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "E",
      "DEC",
      "D",
      "",
      "",
      "",
      "BCE",
      "D",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [9, 11, 12, 18, 22, 24, 26, 28, 30, 31, 35, 37, 40, 44, 45, 47, 53],
  },
  42: {
    image: "42.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "BE",
      "DC",
      "",
      "",
      "",
      "E",
      "BD",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [7, 8, 14, 18, 35, 46, 50, 51, 55],
  },
  43: {
    image: "43.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "E",
      "DCB",
      "",
      "",
      "",
      "",
      "BE",
      "DE",
      "D",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [5, 13, 18, 19, 26, 28, 29, 30, 38, 40, 54],
  },
  44: {
    image: "44.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "CE",
      "D",
      "",
      "",
      "",
      "BEC",
      "D",
      "",
      "",
      "",
      "BE",
      "D",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [5, 6, 10, 11, 13, 17, 22, 24, 31, 38, 40, 41, 48, 49, 52, 53, 55],
  },
  45: {
    image: "45.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "C",
      "",
      "",
      "",
      "BEC",
      "BDC",
      "",
      "",
      "",
      "B",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [5, 8, 12, 15, 32, 35, 37, 40, 41, 48, 50, 52],
  },
  46: {
    image: "46.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "C",
      "CEB",
      "D",
      "",
      "",
      "EB",
      "BD",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [6, 11, 15, 20, 21, 22, 27, 42, 49, 51],
  },
  47: {
    image: "47.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "E",
      "BCDE",
      "D",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [3, 4, 8, 9, 12, 19, 22, 24, 26, 28, 30, 31, 39, 40, 41, 53],
  },
  48: {
    image: "48.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "C",
      "",
      "",
      "",
      "BEC",
      "BD",
      "",
      "",
      "",
      "BE",
      "D",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [5, 15, 24, 25, 35, 37, 38, 40, 44, 45, 55],
  },
  49: {
    image: "49.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "CE",
      "D",
      "",
      "",
      "",
      "BEs",
      "DC",
      "",
      "",
      "",
      "E",
      "DB",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [35, 44, 46, 50, 51, 52, 55],
  },
  50: {
    image: "50.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      
      "",
      "",
      "BE",
      "DEC",
      "D",
      "",
      "",
      "E",
      "DB",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [8, 32, 45, 49, 42, 51, 52],
  },
  51: {
    image: "51.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "CE",
      "BD",
      "",
      "",
      "",
      "BE",
      "DC",
      "",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [21, 25, 35, 42, 46, 49, 50, 52, 55],
  },
  52: {
    image: "52.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "CE",
      "DC",
      "",
      "",
      "",
      "BE",
      "DBC",
      "",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [5, 8, 12, 15, 24, 32, 35, 38, 40, 44, 45, 49, 50, 51, 55],
  },
  53: {
    image: "53.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "E",
      "BDC",
      "",
      "",
      "",
      "E",
      "BD",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [4, 9, 10, 20, 22, 24, 26, 33, 41, 47, 44, 54],
  },
  54: {
    image: "54.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "E",
      "DE",
      "DC",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "BC",
      "",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [2, 3, 5, 9, 13, 16, 26, 29, 33, 34, 43, 53],
  },
  55: {
    image: "55.jpg",
    structure: [
      "",
      "",
      "",
      "",
      "",
      "",
      "C",
      "",
      "",
      "",
      "",
      "BE",
      "DC",
      "",
      "",
      "",
      "E",
      "BCD",
      "",
      "",
      "",
      "",
      "B",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    voisins: [5, 7, 8, 17, 24, 36, 38, 40, 42, 44, 48, 49, 51, 52],
  },
  };
  
  