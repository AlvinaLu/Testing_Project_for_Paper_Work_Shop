import React, {useEffect, useState} from 'react';

import {CircularProgress, Container, Grid, makeStyles, Typography} from "@material-ui/core";
import {GoodCard} from "./GoodGard";
import {goodsRequest, IGoodsRequest} from "../../userEffects/goodsRequest";
import {useParams} from "react-router-dom";
import {IParamTypes} from "../Categories";

const useStyles = makeStyles(() => ({
  root: {
    padding: 1
  },
  categories: {
    background: "#ffffff",
    padding: 1,
    paddingLeft: 10,
    margin: 1,
    textAlign: 'left',
    wight: "100%"
  },
  goodsList: {
    background: "#ffffff",
    padding: 1,
    textAlign: 'center',
  },
}));

export interface IGood {
  id: number;
  name: string;
  description: string;
  amount: number;
  price: number;
  category: number;
}

export const goodsRequestGoods = (id: number) => {
  const iGoodsRequest = goodsRequest(new class implements IGoodsRequest {
    id = id;
  });
  return iGoodsRequest;
};

export interface IGoodProps {
  good: IGood;
}


export const Goods = () => {
  const params = useParams<IParamTypes>();
  const [error, setError] = useState<string | undefined>(undefined);
  const [goods, setGoods] = useState<Array<IGood> | undefined>(undefined);
  const categoryId = parseInt(params.id);



  useEffect(() => {

    goodsRequestGoods(categoryId)
      .then(result => {
        if (result.status === 200) {
          setGoods(result.arrayGoods);
        } else {
          console.error("Good request is wrong" + result.errorText);
          setError(result.errorText);
        }
      }, error => {
        console.error("Unknown error");
      });
    ;
  }, [params]);

  if (error !== undefined) {
    return (<Typography variant="caption" display="block" style={{color: "#fa0303"}}>{error}</Typography>);
  } else if (goods === undefined) {
    return (
      <CircularProgress/>
    );
  } else {
    return (
      <Container>
        <Grid
          spacing={2}
          container
        >
          {goods.map((item) => {
              return (
                <Grid  item key={item.id} xs={12} sm={6} md={3} spacing={2} style={{marginTop: 8}}>
                  <GoodCard good={item}/>
                </Grid>
              );
            }
          )}
        </Grid>
      </Container>
    );
  }
};

