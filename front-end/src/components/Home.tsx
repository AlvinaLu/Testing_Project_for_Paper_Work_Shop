import React from 'react';
import {generatePath, Redirect} from "react-router-dom";



export const Home = () => {

  return (
    <>
      <Redirect to={generatePath("/:category", {category: 1})}/>
    </>
  );

};