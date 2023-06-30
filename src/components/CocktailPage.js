import React from "react";
import useScrollTop from "../hooks/useScrollTop";
import useEnrichCocktail from "../hooks/useEnrichCocktail";
import { connect } from "react-redux";
import { Fade, Box, Grid, Typography } from "@material-ui/core";
import { currentCocktailSelector } from "../selectors";
import { makeStyles } from "@material-ui/core/styles";
import CocktailDetail from "./CocktailPage/CocktailDetail";
import CocktailVariantList from "./CocktailPage/CocktailVariantList";
import jsonData from '/Users/bramschork/Documents/cocktails/src/data/data.json';

const fullHeight = "92vh";

const useStyles = makeStyles(theme => ({
  cocktailDetail: {
    overflow: "auto",
    [theme.breakpoints.up("sm")]: {
      height: fullHeight
    }
  },
  cocktailDetailContent: {
    padding: theme.spacing(2)
  },
  cocktailImage: {
    ...theme.mixins.toolbar,
    backgroundColor: theme.palette.grey[400],
    backgroundRepeatY: "no-repeat",
    backgroundSize: "cover",
    [theme.breakpoints.up("xs")]: {
      height: fullHeight
    }
  },
  mobileImage: {
    height: "20vh",
    backgroundPosition: "center"
  }
}));


export const CocktailPage = ({ cocktail }) => {
  const classes = useStyles();
  useScrollTop();
  useEnrichCocktail(cocktail);

  if (!cocktail) return <span>Cocktail not found</span>;

  const image = cocktail.enrichment && cocktail.enrichment.image;

  return (
    <>
      <Fade in={!!image}>
        <Box
          component="div"
          className={classes.mobileImage}
          display={{ xs: "block", md: "none" }}
          style={image && { backgroundImage: `url(${image})` }}
        />
      </Fade>
      <Grid container className={classes.root}>
        <Grid className={classes.cocktailDetail} item md={6} xs={12}>
          <div className={classes.cocktailDetailContent}>
            <CocktailDetail cocktail={cocktail} />
            <CocktailVariantList cocktail={cocktail} />
          </div>
        </Grid>
        <Grid item md={6} xs={false}>
          <div id="json-container">
            {jsonData.map((record, index) => (
              <div key={index}>
                {Object.entries(record).map(([key, value]) => (
                  <div key={key}>
                    <Typography variant="h6">{key}</Typography>
                    <Typography>{value}</Typography>
                    <hr />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </>
  );
};


const mapStateToProps = (state, ownProps) => ({
  cocktail: currentCocktailSelector(state, ownProps)
});

export default connect(mapStateToProps)(CocktailPage);
