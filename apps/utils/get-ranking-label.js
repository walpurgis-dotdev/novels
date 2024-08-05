import { IMAGE_RANKINGS } from "./constants";

export const getRankingLabel = (rank) => {
  switch (rank) {
    case 1:
      return IMAGE_RANKINGS.first;
    case 2:
      return IMAGE_RANKINGS.second;
    case 3:
      return IMAGE_RANKINGS.third;
    default:
      return rank;
  }
};
