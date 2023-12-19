import { Col } from 'react-bootstrap';

const ToppingOptions = ({ name, imagePath }) => {
    return (
      <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
          <img
            style={{width: '15%'}}
            alt = {`${name} topping`}
            src = {`http://localhost:3030/${imagePath}`}/>
      </Col>
    );
};

export default ToppingOptions;
