import React from 'react';
import { Link, Map } from '../interface';


const XLink: React.FC<Link> = (props: Link) => {
  const {
    href, target, rel, title,
  } = props;

  const params: Map = {};
  params.href = href;

  if (target !== '') {
    params.target = target;
  }
  if (rel !== '') {
    params.rel = rel;
  }

  return <a {...params}>{title}</a>;
};

export default XLink;
