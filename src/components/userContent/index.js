import React from 'react';
import { Row, Col, Avatar, Badge } from 'antd';
import styles from './userContent.css';
const Example = ({user, datile}) => {
  return (
    <div className={styles.content} onClick={datile}>
      <Row gutter={6}>
        <Col span={3}>
          <Avatar size="large" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{user.name}</Avatar>
        </Col>
        <Col span={18} className={styles.text}></Col>
        <Col span={3}>
          <Badge count={100} />
        </Col>
      </Row>
      <div className={styles.line}></div>
    </div>
  );
};


export default Example;
