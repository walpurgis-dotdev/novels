// import { CardContent, CardDescription, CardTitle } from "@/components/primitives/ui/card";
// import { IconImage } from "@/components/visuals/icon/icon-image";
// import { IconNumber } from "@/components/visuals/icon/icon-number";
// import { NovelBooks } from "@/components/visuals/novel-books";
// import { capitalizeFirstLetter } from "@/utils/cap-first-letter";
// import { IMAGE_NOVEL_DEFAULT } from "@/utils/constants";
// import { getRankingLabel } from "@/utils/get-ranking-label";
// import { getTypingLabel } from "@/utils/get-typing-label";

// const BasicInfo = ({ item }) => (
//   <div className="flex flex-1 items-center justify-between space-x-3">
//     <CardTitle className="text-sm font-normal leading-8 line-clamp-1">{capitalizeFirstLetter(item.title)}</CardTitle>
//     <CardDescription className="text-xs">{item.chapters}</CardDescription>
//   </div>
// );
// const FullInfo = ({ item, type }) => (
//   <div className="flex flex-1 items-start justify-between">
//     <div className="flex flex-col space-y-1">
//       <CardTitle className="text-sm font-normal leading-8 line-clamp-1">{capitalizeFirstLetter(item.title)}</CardTitle>
//       <div className="flex flex-col space-y-0.5">
//         <CardDescription className="text-xs hover:text-destructive">{item.genre.name}</CardDescription>
//         <CardDescription className="text-xs">
//           {item.chapters} {getTypingLabel(type)}
//         </CardDescription>
//       </div>
//     </div>
//     <NovelBooks src={item.covers ? item.covers["150"] : IMAGE_NOVEL_DEFAULT} size="zs" />
//   </div>
// );

// export function ItemRanking({ type, item, idx, hovered, handleHover }) {
//   return (
//     <CardContent className="flex py-0" onMouseEnter={() => handleHover(item.id)}>
//       {idx < 3 ? (
//         <IconImage src={getRankingLabel(idx + 1)} alt={`Top ${idx + 1}`} />
//       ) : (
//         <IconNumber number={idx < 9 ? `0${idx + 1}` : idx + 1} />
//       )}

//       {hovered !== item.id && (idx !== 0 || hovered !== null) && <BasicInfo item={item} />}
//       {(hovered === item.id || (idx === 0 && hovered === null)) && <FullInfo item={item} type={type} />}
//     </CardContent>
//   );
// }
