export interface Map {
  [key: string]: any,
  [index: number]: any,
}

export interface Server {
  name: string;
  location: string;
  region: string;
  ipv4_support: boolean;
  ipv6_support: boolean;
  os: string;
  arch: string;
  physical_cpu_core: number;
  logical_cpu_core: number;
  cpu_core: number;
  cpu_percent: number;
  load_avg: number[];
  uptime: number;
  uptime_str: string;
  traffic_rx: number;
  traffic_rx_str: string;
  traffic_tx: number;
  traffic_tx_str: string;
  traffic_rx_total: number;
  traffic_rx_total_str: string;
  traffic_tx_total: number;
  traffic_tx_total_str: string;
  mem_total: number;
  mem_total_str: string;
  mem_used: number;
  mem_used_str: string;
  swap_total: number;
  swap_total_str: string;
  swap_used: number;
  swap_used_str: string;
  hdd_total: number;
  hdd_total_str: number;
  hdd_used: number;
  hdd_used_str: string;
  custom?: string;
}

export interface SergateData {
  servers?: Array<Server>;
  updated?: string;
}

export interface Link {
  href: string;
  target?: string;
  rel?: string;
  title: string;
}

export interface Platform {
  name: string;
}
