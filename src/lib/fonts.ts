import { Inter, Rubik } from "next/font/google";

export const InterFont = Inter({
  subsets: ["latin"]
});

export const RubikFont = Rubik({
  subsets: ["latin"]
});

export function loadFont(language: string | undefined) {
  if (language === "ar") {
    return RubikFont.className;
  } else {
    return InterFont.className;
  }
}

export function loadPageDirection(language: string | undefined) {
  if (language === "ar") {
    return "rtl";
  } else {
    return "ltr";
  }
}
