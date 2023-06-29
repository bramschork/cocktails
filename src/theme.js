import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import indigo from "@material-ui/core/colors/indigo";
import red from "@material-ui/core/colors/red";
import teal from "@material-ui/core/colors/teal";
import brown from "@material-ui/core/colors/brown";
import orange from "@material-ui/core/colors/orange";
import deepPurple from "@material-ui/core/colors/deepPurple";

import { connect } from "react-redux";

export const colors = {
  indigo,
  red,
  teal,
  brown,
  orange,
  purple: deepPurple
};

/**
 * override theme defaults here.
 */
function createTheme(color, theme) {
  return createMuiTheme({
    palette: {
      primary: red,
      secondary: theme === "light" ? orange: red,
      type: theme
    },
    typography: {
      useNextVariants: true
    }
  });
}

const mapStateToProps = state => ({
  color: state.settings.color,
  theme: state.settings.theme
});

const Theme = ({ color, theme, children }) => (
  <MuiThemeProvider theme={createTheme(color, theme)}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);

export default connect(mapStateToProps)(Theme);
