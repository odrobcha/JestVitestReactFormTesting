import Alert from 'react-bootstrap/Alert';

const AlertBanner = ({message, variant})=>{

    const alertMessage = message || 'An unxepected error occurred. Please try again later';
    const alertVariant = variant || 'danger';

    return(
      <Alert variant={alertVariant}
      style ={{background:'red'}}
      >
          {alertMessage}
      </Alert>
    )
};

export default AlertBanner
