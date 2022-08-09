import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");


export const COLORS = {
    // Base Colors
    primary: '#d6ae1e', // golden
    secondary: "#fcd33d", // gray

    //Colors
    black: "#1f1f1f",
    white: "#f7f4eb",
    red: '#f25265',
    green: '#3bbf51',

    lightGray: "#202224",
    lightGray2: "#2b2e30",
    lightGray3: "#3a3f42",
    lightGray4: "#636b70",
    transparet: "transparent",
    darkGray: "#82817d",
};

export const SIZES = {
    //global sizes
    base: 8,
    font: 14,
    radius: 25,
    padding: 10,
    padding2: 12,

    //Font Sizes
    largeTitle: 50,
    h1: 30,
    h2: 25,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 15,
    body5: 13,

    //App dimension
    width,
    height
};

export const FONTS = {
    largeTitle: { fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontSize: SIZES.h2, lineHeight: 30, },
    h3: {  fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontSize: SIZES.body2, lineHeight: 30 },
    dody3: { fontSize: SIZES.dody3, lineHeight: 22 },
    body4: { fontSize: SIZES.body4, lineHeight: 20,  },
    body5: { fontSize: SIZES.body5, lineHeight: 22,  },
}

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;

//'Cascadia Code', 'Fira Code'