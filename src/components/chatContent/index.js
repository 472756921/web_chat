import React from 'react';
import { Row, Col, Avatar } from 'antd';
import styles from './index.css';

const Example = ({message}) => {
  return (
    <div className={styles.content}>
      {
        message.type === 1
        ?
          <Row gutter={16}>
            <Col span={14} offset={6} className={styles.textByMe}>{message.msg}</Col>
            <Col span={4}>
              <Avatar size="large" style={{ color: '#f56a00', backgroundColor: '#fde3cf', float: 'right' }}>123</Avatar>
            </Col>
          </Row>
        :
          <Row gutter={16}>
            <Col span={4}>
              <Avatar size="large" style={{ color: '#f56a00', backgroundColor: '#fde3cf'}}>123</Avatar>
            </Col>
            <Col span={14} className={styles.text}>{message.msg}</Col>
          </Row>
      }
    </div>
  );
};


export default Example;
