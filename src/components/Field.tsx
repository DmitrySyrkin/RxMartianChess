import React, { Component } from "react";
import {Styles} from "../styles"

type FieldProps = { 
  row: number;
  col: number
  onClick: any;
};

const getStyle = (props: FieldProps) => {
  return props.row > 3 ? Styles.RedBg : Styles.BlueBg;
};

export const Field = (props: FieldProps) => (
  <button style={getStyle(props)} onClick={() => props.onClick()}>
    {`${props.row}:${props.col}`}
  </button>
);
