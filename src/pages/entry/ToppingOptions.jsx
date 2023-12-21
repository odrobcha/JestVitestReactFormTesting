import React from 'react';
import { Col } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useOrderDetails } from '../../context/OrderDetails';

const ToppingOptions = ({ name, imagePath }) => {
    const {updateItemCount} = useOrderDetails();

    const handleChange = (e)=>{

        const count = e.target.checked? 1 : 0;
        updateItemCount(name, count, "toppings");
    }

    return (
      <div style={{display: "grid", gridTemplateColumns: "100%", gridTemplateRows: "150px auto"}}>
          <img
            style={{width: '150px'}}
            alt = {`${name} topping`}
            src = {`http://localhost:3030/${imagePath}`}/>

          <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: '10px' }}>

              <Col xs="5" style={{ textAlign: 'left' }}>
                  <Form.Check
                    type="checkbox"
                    label = {name}
                    onChange={handleChange}
                  >

                  </Form.Check>
              </Col>

          </Form.Group>
      </div>
    );
};

export default ToppingOptions;
