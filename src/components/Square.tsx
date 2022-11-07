import React, { Component } from "react";
import CSS from "csstype";

type SquareProps = {
  col: number;
  row: number;
  value: string;
  onClick: any;
};

const redBg: CSS.Properties = {
  backgroundColor: "red",
};

const blueBg: CSS.Properties = {
  backgroundColor: "blue",
};

const getStyle = (props: SquareProps) => {
  return props.row > 12 ? redBg : blueBg;
};

export const Square = (props: SquareProps) => (
  <button style={getStyle(props)} onClick={() => props.onClick()}>
    {props.value ?? "・"}
  </button>
);
