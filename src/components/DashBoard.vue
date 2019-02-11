<template>
  <div class="board">
    <div class="title">
      <div>2018年中国印钞造币“十件大事”<br>投票结果<br></div>
      <p class="updatetime">下次更新：{{nextUpdateTime}}</p>
    </div>
    <div class="list">
      <div class="title">1.各企业投票排名</div>
      <ul>
        <li
          v-for="({company_name,num},idx) in votesByCompany"
          :key="company_name"
        >
          <div class="detail">
            <div class="idx">{{String(idx+1).padStart(2,'0')}}</div>
            <div class="company">{{company_name}}</div>
          </div>
          <div class="num">{{num}}</div>
        </li>
      </ul>
    </div>

    <div class="list">
      <div class="title">2.候选事件投票排名</div>
      <ul>
        <li
          v-for="({vote_name,vote_nums},idx) in votesByList"
          :key="vote_name"
        >
          <div class="detail">
            <div class="idx">{{String(idx+1).padStart(2,'0')}}</div>
            <div class="company">{{vote_name}}</div>
          </div>
          <div class="num">{{vote_nums}}</div>
        </li>
      </ul>
      <div class="footer">
        2019&copy;中国印钞造币总公司
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
const db = require("../utils/db");
interface companyItem {
  company_name: string;
  num: number;
}
type votesCompany = Array<companyItem>;

interface voteItem {
  vote_name: string;
  vote_nums: number;
}
type votesList = Array<voteItem>;

@Component
export default class DashBoard extends Vue {
  votesByCompany: votesCompany = [];
  votesByList: votesList = [];
  intvalId: number | null = null;
  nextUpdateTime: string = "";

  async loadCompanyVotes() {
    let {
      data
    }: {
      data: votesCompany;
    } = await db.getCbpmVoteMain();
    this.votesByCompany = data;
  }

  async loadListVotes() {
    let { data } = await db.getCbpmVoteList();
    this.votesByList = data.sort(
      (b: voteItem, a: voteItem) => a.vote_nums - b.vote_nums
    );
  }

  refresh() {
    this.loadCompanyVotes();
    this.loadListVotes();
    this.nextUpdateTime = db.later(30);
  }

  mounted() {
    this.refresh();
    this.intvalId = window.setInterval(() => {
      this.refresh();
    }, 30 * 1000);
  }

  beforeDestroy() {
    if (this.intvalId) {
      window.clearInterval(this.intvalId);
    }
  }
}
</script>


<style lang="less" scoped>
.board {
  width: 100%;
  height: 100vh;
  display: flex;
  -webkit-box-orient: vertical;
  flex-direction: column;
}
.bg {
  border-radius: 0.2rem;
  background-color: #373743;
}
.title {
  .bg;
  padding: 10px 10px 0 10px;
  font-size: 1.4rem;
  line-height: 2rem;
  text-align: center;
  margin-bottom: 5px;
  .updatetime {
    font-size: 0.9rem;
    margin: -0.5rem 0 0 0;
  }
}
.footer {
  text-align: center;
  margin: 10px 0;
  padding: 5px;
}
.list {
  .bg;
  font-weight: 100;
  margin-top: 5px;
  margin-bottom: 5px;
  .title {
    font-weight: normal;
  }
  ul {
    margin: 10px 0 20px 0;
    padding: 0;
    li {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 10px;

      &:nth-child(odd) {
        background-color: #3f3f4d;
      }

      @numWidth: 90px;
      @idxWidth: 30px;
      .detail {
        display: flex;
        align-items: center;
        width: calc(100%-@numWidth);
        .idx {
          padding: 6px 3px;
          margin-right: 10px;
          background: #65658d;
          width: @idxWidth;
          border-radius: 0.5rem;
          text-align: center;
        }
        .company {
          padding: 6px 0;
          width: 100%;
        }
      }
      .num {
        color: #ffac00;
        width: @numWidth;
        text-align: right;
      }
    }
  }
}
</style>
