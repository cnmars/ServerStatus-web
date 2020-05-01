import intl from 'react-intl-universal';
import React, { ReactNode } from 'react';
import {
  Row, Col, Tag, Progress, Tooltip, Alert,
} from 'antd';
import { Server, SergateData } from './interface.d';
import { byteUnit, transUptime } from './util';

const resGutter = {
  xs: 8, sm: 16, md: 24, lg: 32,
};

function onlineTag(online: boolean, label: string): React.ReactElement {
  return <Tag color={online ? '#87d068' : '#f50'}>{online ? 'ON' : 'OFF'}</Tag>;
}

function networkTips(traffic_rx: number, traffic_tx: number): string {
  return `${byteUnit(traffic_rx)} ↓|↑ ${byteUnit(traffic_tx)}`;
}

function trafficTips(traffic_rx_total: number, traffic_tx_total: number): string {
  return `${byteUnit(traffic_rx_total)} ↓|↑ ${byteUnit(traffic_tx_total)}`;
}

function memTips(mem_used: number, mem_total: number, swap_used: number, swap_total: number): ReactNode {
  return (
    <dl>
      <dt>Mem:</dt>
      <dd>
        {`${byteUnit(mem_used)} / ${byteUnit(mem_total)}`}
      </dd>
      <dt>Swap:</dt>
      <dd>
        {`${byteUnit(swap_used)} / ${byteUnit(swap_total)}`}
      </dd>
    </dl>
  );
}

function hddTips(hdd_used: number, hdd_total: number) {
  return `${byteUnit(hdd_used)}/${byteUnit(hdd_total)}`;
}

const Flag: React.FC<{ loc: string, title: string }> = ({ loc, title }) => (
  <i title={title} className={`flag-icon flag-icon-${loc.toLowerCase()}`} />
);

const ServerRow: React.FC<SergateData> = (props: SergateData) => {
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
          <Row key={server.name} className="sr-body" type="flex" justify="center" gutter={resGutter}>
            <Col xs={3} sm={3} md={1} lg={1}>{onlineTag(server.ipv4_support, 'IPv4')}</Col>
            <Col xs={0} sm={0} md={0} lg={1}>{onlineTag(server.ipv6_support, 'IPv6')}</Col>
            <Col xs={3} sm={3} md={3} lg={2}>{server.name}</Col>
            <Col xs={3} sm={2} md={2} lg={1}><Flag loc={server.region} title={server.location} /></Col>
            <Col xs={3} sm={4} md={2} lg={2}>{transUptime(server.uptime)}</Col>
            <Col xs={0} sm={0} md={0} lg={1}>{server.load_avg[0]}</Col>
            <Col xs={0} sm={0} md={4} lg={3}>{networkTips(server.traffic_rx, server.traffic_tx)}</Col>
            <Col xs={0} sm={0} md={4} lg={3}>{trafficTips(server.traffic_rx_total, server.traffic_tx_total)}</Col>
            <Col xs={3} sm={3} md={3} lg={3}>
              <Progress strokeWidth={12} percent={server.cpu_percent} status="active" />
            </Col>
            <Col xs={3} sm={3} md={3} lg={3}>
              <Tooltip placement="left" title={memTips(server.mem_used, server.mem_total, server.swap_used, server.swap_total)}>
                <Progress strokeWidth={12} percent={Number(((server.mem_used / server.mem_total) * 100).toFixed(1))} status="active" />
              </Tooltip>
            </Col>
            <Col xs={3} sm={3} md={3} lg={3}>
              <Tooltip placement="left" title={hddTips(server.hdd_used, server.hdd_total)}>
                <Progress strokeWidth={12} percent={Number(((server.hdd_used / server.hdd_total) * 100).toFixed(1))} status="active" />
              </Tooltip>
            </Col>
          </Row>
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

export default ServerRow;
