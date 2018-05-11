import { connect } from 'dva'
import styles from './index.css'
import PropTypes from 'prop-types'
import UserContent from '../../components/userContent';

import {name} from '../../utils/config'

const home = ({loading, dispatch}) => {
  function datile() {
    alert(1222);
  }
  return (
    <div className={styles.bk}>
      <div className={styles.listTitle}>好友列表</div>
      <div className={styles.content}>
        <UserContent user={{name: 'Benson'}} datile={datile}/>
      </div>
    </div>
  )
}
home.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ loading }) => ({ loading }))(home)
