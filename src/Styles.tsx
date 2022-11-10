import { Figure } from "./components/Field";

export const GetStyle = (bgColor: string, figure: Figure, isSelected: boolean) => {
  return {
    backgroundColor: bgColor,
    height: 80,
    width: 80,
    color: isSelected ? 'yellow' : 'black'
  };
};
