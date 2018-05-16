/* global window */
/* global document */
import { withRouter } from 'dva/router'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import {openPages} from '../utils/config'
import Loader from '../components/Loader'
import { name, footerText } from '../utils/config'
import styles from './app.css';

const App = ({children, loading, location}) => {
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
    return (
      <div>
        <Loader fullScreen spinning={loading.global}></Loader>
        {children}
      </div>
    )
  }
}


App.propTypes = {
  children: PropTypes.element.isRequired,
  app: PropTypes.object,
  loading: PropTypes.object,
}


export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))
