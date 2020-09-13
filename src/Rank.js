import React from "react";
import img_rank from "./img/Rank.png";

function RankList({ rank }) {
  return (
    <div className="t_Contents_rank">
      <div className="rank_space"></div>
      <div className="rank_title">{rank.rank}</div>
      <div className="rank_recode">
        <span>{rank.recodeM >= 10 ? rank.recodeM : "0" + rank.recodeM}</span>:
        <span>{rank.recodeS >= 10 ? rank.recodeS : "0" + rank.recodeS}</span>:
        <span>{rank.recodeMs >= 10 ? rank.recodeMs : "0" + rank.recodeMs}</span>
      </div>
      <div className="rank_space"></div>
    </div>
  );
}

const Rank = (props) => {
  const fn_goBack = () => {
    props.history.push({
      pathname: "/",
      state: {
        readRecode: "false",
      },
    });
  };

  return (
    <div className="atoz-template">
      <div className="main-title">AtoZ</div>

      <RankList rank={props.location.state.recodeArray[0]} />
      <RankList rank={props.location.state.recodeArray[1]} />
      <RankList rank={props.location.state.recodeArray[2]} />
      <RankList rank={props.location.state.recodeArray[3]} />
      <RankList rank={props.location.state.recodeArray[4]} />

      <div className="t_Contents_foot">
        <img src={img_rank} alt="GoBack" onClick={fn_goBack} />
      </div>
    </div>
  );
};

export default Rank;
