import React from "react";
import img_howtoplay from "./img/HowToPlay.png";

const Rule = (props) => {
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
      <div className="t_Contents_rule">
        세상에서 가장
        <br />
        손이 빠른 자가 누구인가?
        <br />
        Who is the Best?
        <br />
        <br />
        알파벳 순서대로 눌러라
        <br />
        Press A to Z<br />
        <br />
        게임은 시작되었다
        <br />
        Game has begun
      </div>
      <div className="t_Contents_foot">
        <img src={img_howtoplay} alt="GoBack" onClick={fn_goBack} />
      </div>
    </div>
  );
};

export default Rule;
