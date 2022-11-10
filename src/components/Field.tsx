import React, { Component } from "react";
import { GetStyle } from "../Styles";

export enum Figure {
  None,
  Pawn,
  Drone,
  Queen,
}

export type FieldProps = {
  row: number;
  col: number;
  isSelected: boolean;
  figure: Figure;
  onClick?: any;
};

const getStyle = (props: FieldProps) => {
  return props.row > 3
    ? GetStyle(
        (props.col + props.row) % 2 == 0 ? "red" : "pink",
        props.figure,
        props.isSelected
      )
    : GetStyle(
        (props.col + props.row) % 2 == 0 ? "navy" : "blue",
        props.figure,
        props.isSelected
      );
};

export const Field = (props: FieldProps) => (
  <button style={getStyle(props)} onClick={() => props.onClick()}>
    <h2>{props.figure}</h2>
    {`${props.row}:${props.col}`}
  </button>
);
