import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useOrderDetails } from '../../context/OrderDetails';

const ScoopOption = ({ name, imagePath }) => {
    const { updateItemCount } = useOrderDetails();
    const handleChange = (e) => {
        updateItemCount(name, parseInt(e.target.value), 'scoops');
    };
    return (
      <div style={{display: "grid", gridTemplateColumns: "100%", gridTemplateRows: "150px auto"}}>


              <img
                style={{ height: '150px' }}
                alt={`${name} scoop`}
                src={`http://localhost:3030/${imagePath}`}/>
              <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: '10px' }}>
                  <Form.Label column xs="6" style={{ textAlign: 'right' }}>{name}</Form.Label>
                  <Col xs="5" style={{ textAlign: 'left' }}>
                      <Form.Control
                        type="number"
                        defaultValue={0}
                        onChange={handleChange}
                      >

                      </Form.Control>
                  </Col>

              </Form.Group>

      </div>
    );
};

export default ScoopOption;
