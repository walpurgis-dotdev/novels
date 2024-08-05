import { optionalControls } from "@/utils/constants";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Client-side code: Use localStorage for persisting data
const initializeOptions = () => {
  // const storedOptions = localStorage.getItem("options");
  // if (storedOptions) {
  //   return JSON.parse(storedOptions);
  // }
  return {
    fontFamilySchema: optionalControls.fontFamilySchema[0],
    themeColorSchema: optionalControls.themeColorSchema[0],
    maxWidthSchema: optionalControls.maxWidthSchema[1],
    fontSizeSchema: optionalControls.fontSizeSchema[2],
    lineHeightSchema: optionalControls.lineHeightSchema[3],
  };
};
// COMMENT: Lưu trạng thái của các control tùy chọn vào localStorage
export const useOptionalControlStore = create(
  persist(
    (set) => ({
      options: initializeOptions(),
      setOptions: (key, value) =>
        set((state) => ({
          options: {
            ...state.options,
            [key]: value,
          },
        })),
      // COMMENT: Increase FontSize
      increaseFs: () =>
        set((state) => {
          const currentIndex = optionalControls.fontSizeSchema.findIndex(
            (item) => item.label === state.options.fontSizeSchema.label,
          );
          const nextIndex = currentIndex + 1;
          if (nextIndex < optionalControls.fontSizeSchema.length) {
            return {
              options: {
                ...state.options,
                fontSizeSchema: optionalControls.fontSizeSchema[nextIndex],
              },
            };
          }
        }),
      // COMMENT: Decrease FontSize
      decreaseFs: () =>
        set((state) => {
          const currentIndex = optionalControls.fontSizeSchema.findIndex(
            (item) => item.label === state.options.fontSizeSchema.label,
          );
          const nextIndex = currentIndex - 1;
          if (nextIndex >= 0) {
            return {
              options: {
                ...state.options,
                fontSizeSchema: optionalControls.fontSizeSchema[nextIndex],
              },
            };
          }
        }),
    }),
    {
      name: "options",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
