import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ScoopOption from './ScoopOptions';
import ToppingOptions from './ToppingOptions';

import { Row } from 'react-bootstrap';

const Options = ({ optionType }) => {
    const [items, setItems] = useState([]);

    useEffect(
      () => {
          //optionType is 'scoops' or ' toppings
          axios.get(`http://localhost:3030/${optionType}`)
            .then(res => {
                console.log(res.data)
                setItems(res.data);
            })
            .catch(err => {
                //error handling
            });
      },
      [optionType]);

    const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOptions;

    const optionItems = items.map((item) => (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    ));


    return (
      <>
          <Row>
              {optionItems}
          </Row>
      </>
    );
};

export default Options;
