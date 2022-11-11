import { Figure } from "./components/Field";
import "./main.scss";

export const GetClassName = (
  bgColor: string,
  figure: Figure,
  isSelected: boolean
) => {
  return `btn ${bgColor} ${isSelected ? "selected" : ""} ${figure}`;
};
