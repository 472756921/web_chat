import { connect } from 'dva'
import styles from './index.css'
import PropTypes from 'prop-types'
import { Row, Col, Input, Icon } from 'antd';

const chat = ({chatContent, loading, dispatch}) => {
  function changeMessage(e) {
    dispatch({type:'chatContent/innerMessage', payload:e.target.value});
  }
  return (
    <div className={styles.bk}>
      <div className={styles.title}>title</div>
      <div className={styles.messageContent}>
        message
      </div>
      <div className={styles.toke}>
        <Row>
          <Col className="gutter-row" span={3}>
            <Icon type="smile-o" style={{fontSize:'1.8rem', marginTop: '.1rem'}}/>
          </Col>
          <Col className="gutter-row" span={18}>
            <Input placeholder="输入消息" maxLength={100} value={chatContent.send_message} onChange={changeMessage}/>
          </Col>
          <Col className="gutter-row" span={3}>
            {
              chatContent.send_message.length !== 0
                ?<Icon type="check-circle" style={{fontSize:'1.8rem', marginTop: '.1rem', color:'#5990b3'}}/>
                :<Icon type="plus-circle-o" style={{fontSize:'1.8rem', marginTop: '.1rem'}}/>
            }
          </Col>
        </Row>
      </div>
    </div>
  )
}
chat.propTypes = {
  chatContent: PropTypes.object,
  loading: PropTypes.object,
}
export default connect(({ loading, chatContent }) => ({ loading, chatContent }))(chat)
