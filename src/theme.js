import { createMuiTheme } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import { darken } from "@material-ui/core/styles/colorManipulator";
import { create } from "jss";
import rtl from "jss-rtl";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";

function getTheme(uiTheme) {
  return createMuiTheme({
    direction: uiTheme.direction,
    nprogress: {
      color: uiTheme.paletteType === "light" ? "#000" : "#fff"
    },
    palette: { ...uiTheme.paletteColors, type: uiTheme.paletteType },
    typography: {
      // Use typography V2 as the old one is deprecated:
      // https://material-ui.com/style/typography/#strategies
      useNextVariants: true
    }
  });
}

const baseTheme = {
  paletteType: "light",
  paletteColors: {
    primary: blue,
    secondary: {
      // Darken so we reach the AA contrast ratio level.
      main: darken(pink.A400, 0.08)
    }
  }
};

const rtlTheme = getTheme({
  direction: "rtl",
  ...baseTheme
});

const ltrTheme = getTheme({
  direction: "ltr",
  ...baseTheme
});

// Configure JSS
const rtlJss = create({
  plugins: [...jssPreset().plugins, rtl({ enabled: true })]
});
const ltrJss = create({
  plugins: [...jssPreset().plugins, rtl({ enabled: false })]
});

// Custom Material-UI class name generator.
const classNameGenerator = createGenerateClassName();

export { rtlTheme, ltrTheme, rtlJss, ltrJss, classNameGenerator };
