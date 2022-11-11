import React, { Component } from "react";
import { GetClassName } from "../Styles";

export enum Figure {
  None = "none",
  Pawn = "pawn",
  Drone = "drone",
  Queen = "queen",
}

export type FieldProps = {
  row: number;
  col: number;
  isSelected: boolean;
  figure: Figure;
  onClick?: any;
};

const getClassName = (props: FieldProps) => {
  return GetClassName(
    ((props.col + props.row) % 2 == 0 ? "light-" : "") +
      (props.row > 3 ? "red" : "blue"),
    props.figure,
    props.isSelected
  );
};

export const Field = (props: FieldProps) => (
  <button
    className={getClassName(props)}
    onClick={() => props.onClick()}
  ></button>
);
