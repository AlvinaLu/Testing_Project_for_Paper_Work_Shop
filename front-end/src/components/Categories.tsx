import React, { useEffect, useState} from 'react';
import {Link, generatePath} from "react-router-dom";
import {useParams} from "react-router-dom";
import {
  Box,
  CircularProgress,
  Grid,
  List,
  ListItemText,
  makeStyles,
  Paper, Typography,
} from "@material-ui/core";
import {ListItem} from "@material-ui/core";
import {categoriesRequest, ICategoryRequest} from "../userEffects/categoryRequest";
import {Goods} from "./goods/Goods";


const useStyles = makeStyles((theme) => ({
  list: {
    marginLeft: 8,
    marginRight: 8,
  },
  category: {
    backgroundColor: theme.palette.primary.light,
    padding: 1,
    paddingLeft: 10,
    margin: 1,
    textAlign: 'left',
    wight: "100%"
  },
  categoryActive: {
    backgroundColor: theme.palette.primary.dark,
    padding: 1,
    paddingLeft: 10,
    margin: 1,
    textAlign: 'left',
    wight: "100%"
  },
  categoriesButton: {
    wight: "100%",
  },
  categories: {
    background: "#ffffff",
    textAlign: 'center',
  },
  goodsList: {
    background: "#ffffff",
    textAlign: 'center',
  },
  goodsPaper: {
    minHeight: "100%",
    marginTop: 8,
  },
}));

export type Category = {
  id: number;
  name: string;
}

export const categoriesRequestCategory = () => {
  const iCategoryRequest = categoriesRequest(new class implements ICategoryRequest {
    message = "Hi";
  });
  return iCategoryRequest;
};

export interface IParamTypes {
  id: string;
}

export const Categories = () => {
  const params = useParams<IParamTypes>();
  const [error, setError] = useState<string | undefined>(undefined);
  const [categories, setCategories] = useState<Array<Category> | undefined>(undefined);
  const classes = useStyles();

  useEffect(() => {
    categoriesRequestCategory()
      .then(result => {
        if (result.status === 200) {
          setCategories(result.arrayCategories);
        } else {
          console.error("Gategories is wrong" + result.errorText);
          setError(result.errorText);
        }
      }, error => {
        console.error("Unknown error");
      });
    ;
  }, []);



  if (categories === undefined) {
    return (
      <CircularProgress/>
    );
  } else {
    return (
      <Grid container>
        <Grid item xs={3} className={classes.categories}>
          <Paper>
            <List className={classes.list}>
              {
                categories.map((item) => {
                  if (parseInt(params.id)===item.id) {
                    return <Box className={classes.categoryActive}>
                      <ListItem button key={item.id} component={Link}
                                to={generatePath("/:category", {category: item.id})}>
                        <ListItemText primary={item.name}/>
                      </ListItem>
                    </Box>
                  } else {
                    return <Box className={classes.category}>
                      <ListItem button key={item.id} component={Link}
                                to={generatePath("/:category", {category: item.id})}>
                        <ListItemText primary={item.name}/>
                      </ListItem>
                    </Box>
                  }
                })}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={9} className={classes.goodsList}>
          <Paper className={classes.goodsPaper}>
            <Goods/>
            {error===undefined? <></> :<Typography variant="caption" display="block"
                                                   style={{color: "#fa0303"}}>{error}</Typography>}
          </Paper>
        </Grid>
      </Grid>);
  }
};