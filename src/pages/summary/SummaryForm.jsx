import React, { useState } from 'react';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Loader from '../common/Loader';
import AlertBanner from '../common/AlertBanner';

const SummaryForm = ({ onOrderSet }) => {
    const [tcChecked, setTcChecked] = useState(false);
    const [orderNumber, setOrderNumber] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setError] = useState(false);

    const popover = (
      <Popover id="popover-basic">
          <Popover.Body>No ice cream will actually be delivered</Popover.Body>
      </Popover>
    );

    const checkboxLabel = (
      <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: 'blue' }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
    );

    const handleOrder = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(false);

        axios
          .post(
            ' http://localhost:3030/order',
            { order: 'my order' }
          )
          .then(res => {
              setOrderNumber(res.data.orderNumber);
              onOrderSet(res.data.orderNumber);
          })
          .catch(err => {
              setError(true);
          })
          .finally(()=>{
              setIsLoading(false);
          });
    };
    return (
      <>
          <Form onSubmit={handleOrder}>
              <Form.Group controlId="terms-and-conditions">
                  <Form.Check
                    type="checkbox"
                    checked={tcChecked}
                    onChange={(e) => setTcChecked(e.target.checked)}
                    label={checkboxLabel}
                  />
              </Form.Group>
              {!isLoading && <Button variant="primary" type="submit" disabled={!tcChecked}>
                  Confirm order
              </Button>
              }
              {isLoading && <Loader/>}
              {isError && <AlertBanner/>}
          </Form>

      </>
    );
};

export default SummaryForm;
