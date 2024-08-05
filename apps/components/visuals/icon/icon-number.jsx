import { cls } from "@/utils/cn-classes";

export function IconNumber({ number, className, size = 14, width = 32, height = 32 }) {
  return (
    <div
      className={cls("shrink-0 text-center text-sm font-extrabold text-[#c6c4c4]", className)}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        lineHeight: `${height}px`,
        fontSize: `${size}px`,
      }}
    >
      <span>{number}</span>
    </div>
  );
}
