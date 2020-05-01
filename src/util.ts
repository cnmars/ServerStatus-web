import intl from 'react-intl-universal';
import { Map } from './interface.d';

const base = 1024;

const unitSize: Map = {
  P: base ** 5,
  T: base ** 4,
  G: base ** 3,
  M: base ** 2,
  K: base,
  B: 1,
};

const Second = 1;
const Minute = Second * 60;
const Hour = Minute * 60;
const Day = Hour * 24;

export function byteUnit(traffic: number): string | void {
  traffic = traffic || 0;
  if (traffic === 0) {
    return '0B';
  }

  const keys = Object.keys(unitSize);
  const values = Object.values(unitSize);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const value = values[i];
    const n = traffic / value;
    const c = Math.floor(n);
    if (c !== 0) {
      return `${Math.round(n)}${key}`;
    }
  }

  return '0B';
}

export function transUptime(uptime: number): string {
  uptime = uptime || 0;

  let uptimeStr = '';
  if (uptime < Minute) {
    uptimeStr = `${uptime}${intl.get('Second')}`;
  } else if (uptime < (2 * Minute)) {
    uptimeStr = `1${intl.get('Second')}`;
  } else if (uptime < Hour) {
    uptimeStr = `${Math.floor(uptime / Minute)}${intl.get('Minute')}`;
  } else if (uptime < (2 * Hour)) {
    uptimeStr = `1${intl.get('Minute')}`;
  } else if (uptime < Day) {
    uptimeStr = `${Math.floor(uptime / Hour)}${intl.get('Hour')}`;
  } else {
    uptimeStr = `${Math.floor(uptime / Day)}${intl.get('Day')}`;
  }

  return uptimeStr;
}

export function formatDateTime(time: Date) {
  const year = time.getFullYear();
  const month = (`${time.getMonth() + 1}`).padStart(2, '0');
  const day = (`${time.getDate()}`).padStart(2, '0');
  const hour = (`${time.getHours()}`).padStart(2, '0');
  const minute = (`${time.getMinutes()}`).padStart(2, '0');
  const second = (`${time.getSeconds()}`).padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
