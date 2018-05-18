/* global window */
/* global document */
import { withRouter } from 'dva/router'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import {openPages} from '../utils/config'
import Loader from '../components/Loader'
import { name, footerText } from '../utils/config'
import styles from './app.css';

const App = ({app, children, loading, location, dispatch}) => {
  let { user } = app;
  let { pathname } = location;
  if(openPages && openPages.includes(pathname)){
    return (
      <div>
        <Loader fullScreen spinning={loading.global}></Loader>
        {children}
        <footer className={styles.footerText}>{name} {footerText}</footer>
      </div>
    )
  } else {
    if(user){
      return (
        <div>
          <Loader fullScreen spinning={loading.global}></Loader>
          {children}
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}


App.propTypes = {
  children: PropTypes.element.isRequired,
  app: PropTypes.object,
  loading: PropTypes.object,
}


export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))
