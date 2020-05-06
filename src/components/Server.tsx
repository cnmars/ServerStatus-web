import React, { ReactNode } from 'react';
import {
  Row, Col, Progress, Tag, Tooltip,
} from 'antd';
import { Server } from '../interface';
import { byteUnit, transUptime } from '../util';
import XPlatform from './Platform';

const resGutter = {
  xs: 8, sm: 8, md: 16, lg: 16,
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
      <dt>Mem: </dt>
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

const XServer: React.FC<Server> = (props: Server) => {
  const {
    name, location, region, os,
    cpu_percent, load_avg, uptime, ipv4_support, ipv6_support,
    traffic_rx, traffic_tx, traffic_rx_total, traffic_tx_total,
    mem_used, mem_total, swap_used, swap_total,
    hdd_used, hdd_total,
  } = props;

  return (
    <Row className="sr-body" type="flex" justify="center" gutter={resGutter}>
      <Col xs={3} sm={3} md={1} lg={1}>{onlineTag(ipv4_support, 'IPv4')}</Col>
      <Col xs={0} sm={0} md={0} lg={1}>{onlineTag(ipv6_support, 'IPv6')}</Col>
      <Col xs={3} sm={3} md={3} lg={2}>{name}</Col>
      <Col xs={3} sm={2} md={2} lg={1}><Flag loc={region} title={location} /></Col>
      <Col xs={3} sm={2} md={2} lg={1}><XPlatform {...os} /></Col>
      <Col xs={3} sm={4} md={2} lg={2}>{transUptime(uptime)}</Col>
      <Col xs={0} sm={0} md={0} lg={1}>{load_avg[0]}</Col>
      <Col xs={0} sm={0} md={4} lg={3}>{networkTips(traffic_rx, traffic_tx)}</Col>
      <Col xs={0} sm={0} md={0} lg={3}>{trafficTips(traffic_rx_total, traffic_tx_total)}</Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <Progress strokeWidth={12} percent={cpu_percent} status="active" />
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <Tooltip placement="left" title={memTips(mem_used, mem_total, swap_used, swap_total)}>
          <Progress strokeWidth={12} percent={Number(((mem_used / mem_total) * 100).toFixed(1))} status="active" />
        </Tooltip>
      </Col>
      <Col xs={0} sm={3} md={3} lg={3}>
        <Tooltip placement="left" title={hddTips(hdd_used, hdd_total)}>
          <Progress strokeWidth={12} percent={Number(((hdd_used / hdd_total) * 100).toFixed(1))} status="active" />
        </Tooltip>
      </Col>
    </Row>
  );
};

export default XServer;
