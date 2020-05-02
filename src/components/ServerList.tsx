import React from 'react';
import intl from 'react-intl-universal';
import { Row, Col, Alert } from 'antd';
import { Server, SergateData } from '../interface';
import XServer from '../components/Server';

const XServerList: React.FC<SergateData> = (props: SergateData) => {
  let { servers } = props;

  servers = servers || [];
  // const updatedInt = Number(updated) * 1000;
  // const updatedTime = formatDateTime(new Date(updatedInt));

  return (
    <div className="sergate">
      <Row className="sr-head" type="flex" justify="center" gutter={8}>
        <Col xs={3} sm={3} md={1} lg={1}>IPv4</Col>
        <Col xs={0} sm={0} md={0} lg={1}>IPv6</Col>
        <Col xs={3} sm={3} md={3} lg={2}>{intl.get('NAME')}</Col>
        <Col xs={3} sm={2} md={2} lg={1}>{intl.get('LOC')}</Col>
        <Col xs={3} sm={4} md={2} lg={2}>{intl.get('UPTIME')}</Col>
        <Col xs={0} sm={0} md={0} lg={1}>{intl.get('LOAD')}</Col>
        <Col xs={0} sm={0} md={4} lg={3}>{intl.get('NETWORK')}</Col>
        <Col xs={0} sm={0} md={4} lg={3}>{intl.get('TRAFFIC')}</Col>
        <Col xs={3} sm={3} md={3} lg={3}>{intl.get('CPU')}</Col>
        <Col xs={3} sm={3} md={3} lg={3}>{intl.get('RAM')}</Col>
        <Col xs={3} sm={3} md={3} lg={3}>{intl.get('HDD')}</Col>
      </Row>
      {
        (servers?.length > 0) ? servers?.map((server: Server) => (
          <XServer key={(server.name + server.region).toUpperCase()} {...server} />
        ))
          : (
            <Alert
              showIcon
              type="info"
              message={intl.get('LOADING')}
              description={intl.get('WAIT')}
            />
          )
      }
    </div>
  );

  // const updatedInt = parseInt(updated) * 1000;
  // const updatedTime = formatDateTime(new Date(updatedInt));
  // {updatedInt > 0 && <Alert className="lastUpdated" type="info" message={intl.get('LAST_UPDATE', { updatedTime })} />}
};

export default XServerList;
