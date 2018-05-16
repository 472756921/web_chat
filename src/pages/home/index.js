import { connect } from 'dva'
import styles from './index.css'
import PropTypes from 'prop-types'
import UserContent from '../../components/userContent';

const home = ({loading, home, dispatch}) => {
  function datile(userID) {
    dispatch({type:'home/datile', payload:userID});
  }
  return (
    <div className={styles.bk}>
      <div className={styles.listTitle}>好友列表</div>
      <div className={styles.content}>
        {
          home.userList.map( (it, i) => {
            return <UserContent user={{name: it.userName}} datile={() => datile(it.userID)} key={i}/>
          } )
        }
      </div>
    </div>
  )
}
home.propTypes = {
  loading: PropTypes.object,
  home: PropTypes.object,
}
export default connect(({ loading, home }) => ({ loading, home }))(home)
