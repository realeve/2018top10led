// import { axios } from './axios';
import dayjs from 'dayjs';
const { axios } = require('./axios');
/**
 *   @database: { 微信开发 }
 *   @desc:     { 各企业投票数汇总 }
 */
export const getCbpmVoteMain = () =>
  axios({
    url: '/153/007d24c4e6/1.json'
  });

/**
 *   @database: { 微信开发 }
 *   @desc:     { 十件大事投票结果 }
 */
export const getCbpmVoteList = () =>
  axios({
    url: '/149/7477322ba3/1.json'
  });

export const now = () => dayjs().format('HH:mm:ss');
export const later = (seconds) =>
  dayjs()
    .add(seconds, 'seconds')
    .format('HH:mm:ss');
