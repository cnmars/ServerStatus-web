import './App.css';

import intl from 'react-intl-universal';
import React, { useState, useEffect } from 'react';
import {
  Layout, Row, Col, Spin,
} from 'antd';
import Link from './components/Link';
import XServerList from './components/ServerList';

require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/zh.js');

const { Header, Footer, Content } = Layout;

const App: React.FC = () => {
  let currentLocale = window.navigator.language || 'zh-CN';
  if (currentLocale === 'zh-TW' || currentLocale === 'zh-HK') {
    currentLocale = 'zh-TW';
  } else if (currentLocale.startsWith('zh')) {
    currentLocale = 'zh-CN';
  } else {
    currentLocale = 'en-US';
  }

  const [initDone, setInitDone] = useState(false);
  fetch(`locales/${currentLocale}.json`)
    .then((res) => res.json())
    .then((data) => intl.init({
      currentLocale,
      locales: {
        [currentLocale]: data,
      },
    })).then(() => {
      setInitDone(true);
    });

  const [serverData, setServerData] = useState({ servers: [], updated: '0' });
  const [isOnline, setIsOnline] = useState(false);
  useEffect(() => {
    const getServer = () => {
      fetch('http://106.15.93.198:10002')
        .then((res) => res.json())
        .then((data) => {
          setServerData({
            servers: data.server,
            updated: '5',
          });
          setIsOnline(true);
        }).catch((e) => console.log('Error:', e));
    };
    const itv = setInterval(getServer, 5000);
    return () => {
      clearInterval(itv);
    };
  }, []);

  return (
    <div className="App">
      <Layout>
        <Header>
          <div className="logo">ServerStatus</div>
        </Header>
        <Content style={{ background: '#fff' }}>
          <Row type="flex" justify="center">
            <Col xs={24} sm={23} md={23} lg={22} xl={20} xxl={16}>
              {initDone ? (
                <Spin size="large" spinning={!isOnline} tip="Loading...">
                  <XServerList {...serverData} />
                </Spin>
              ) : null}
            </Col>
          </Row>
        </Content>
        <Footer className="footer">
          <Link href="https://github.com/flxxyz/ServerStatus-web/" target="_blank" rel="external noreferrer noopener" title="WebUI" />
          {' for '}
          <Link href="https://github.com/flxxyz/ServerStatus/" target="_blank" rel="external noreferrer noopener" title="ServerStatus" />
          {', made by '}
          <Link href="https://www.ofcss.com/" target="_blank" rel="external noreferrer noopener" title="Kairee" />
          {', ❤customized by '}
          <Link href="https://flxxyz.com/" target="_blank" rel="external noreferrer noopener" title="flxxyz" />
        </Footer>
      </Layout>
    </div>
  );
};

export default App;
