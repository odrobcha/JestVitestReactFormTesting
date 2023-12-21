import classes from './Loader.module.css';

const Loader =  () =>{
    return(
      <div data-testid="loader" className={classes.loaderContainer}>
          <div className={classes['custom-loader']}/>
      </div>

    )
}

export default Loader
