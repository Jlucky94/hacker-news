import {createTheme} from "@mui/material";

export const theme = createTheme({
    components: {
        MuiPaper: {
            defaultProps: {
                style: {
                    backgroundColor: "#82828214",
                    paddingTop: "15px",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                    height: "100%",
                    minHeight:'400px'
                }
            }
        }
    },

})