import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import Game from "./Game";
import Rank from "./Rank";
import Rule from "./Rule";
import img_title from "./img/AtoZ_title.png";
import img_start from "./img/Start.png";
import img_rank from "./img/Rank.png";
import img_howtoplay from "./img/HowToPlay.png";
import "./App.css";

const recodeArray = [
  { rank: "1st", recodeM: 0, recodeS: 0, recodeMs: 0 },
  { rank: "2nd", recodeM: 0, recodeS: 0, recodeMs: 0 },
  { rank: "3rd", recodeM: 0, recodeS: 0, recodeMs: 0 },
  { rank: "4th", recodeM: 0, recodeS: 0, recodeMs: 0 },
  { rank: "5th", recodeM: 0, recodeS: 0, recodeMs: 0 },
];

const recodeData = [{ recodeM: 0, recodeS: 0, recodeMs: 0 }];
const recodeTemp = [{ recodeM: 0, recodeS: 0, recodeMs: 0 }];

const Main = ({ location }) => {
  //console.log("readRecode : ", location.state.readRecode);
  if (location.state !== undefined) {
    if (location.state.readRecode === "true") {
      console.log("recodeM : ", location.state.recodeM);
      console.log("recodeS : ", location.state.recodeS);
      console.log("recodeMs : ", location.state.recodeMs);

      const MyRecode =
        location.state.recodeM * 10000 +
        location.state.recodeS * 100 +
        location.state.recodeMs;
      console.log("MyRecode : ", MyRecode);
      if (MyRecode > 0) {
        //초기 기록 세팅
        recodeData[0].recodeM = location.state.recodeM;
        recodeData[0].recodeS = location.state.recodeS;
        recodeData[0].recodeMs = location.state.recodeMs;

        for (let i = 0; i < 5; i++) {
          const newRecode =
            recodeData[0].recodeM * 10000 +
            recodeData[0].recodeS * 100 +
            recodeData[0].recodeMs;

          const oldRecode =
            recodeArray[i].recodeM * 10000 +
            recodeArray[i].recodeS * 100 +
            recodeArray[i].recodeMs;

          console.log("newRecode : ", newRecode + ", oldRecode : " + oldRecode);
          if (newRecode < (oldRecode === 0 ? 999999 : oldRecode)) {
            recodeTemp[0].recodeM = recodeArray[i].recodeM;
            recodeTemp[0].recodeS = recodeArray[i].recodeS;
            recodeTemp[0].recodeMs = recodeArray[i].recodeMs;

            recodeArray[i].recodeM = recodeData[0].recodeM;
            recodeArray[i].recodeS = recodeData[0].recodeS;
            recodeArray[i].recodeMs = recodeData[0].recodeMs;

            recodeData[0].recodeM = recodeTemp[0].recodeM;
            recodeData[0].recodeS = recodeTemp[0].recodeS;
            recodeData[0].recodeMs = recodeTemp[0].recodeMs;
          } //end of sort
        } //end of for
      } //end of writing Recode

      //Nick's work : 기록세팅 후 랭크페이지로 갈까?
      for (let i = 0; i < 5; i++) {
        console.log(
          recodeArray[i].rank +
            " >> " +
            recodeArray[i].recodeM +
            ":" +
            recodeArray[i].recodeS +
            ":" +
            recodeArray[i].recodeMs
        );
      }
    }
  }
  return (
    <div className="atoz-template">
      <div className="main-title">
        <img src={img_title} alt="title_image" className="title_img" />
      </div>
      <div className="t_Contents">
        <Link to="/Game" className="link_Style">
          <img src={img_start} alt="START" className="button_img" />
        </Link>
      </div>
      <div className="t_Contents">
        <Link
          to={{ pathname: "/Rank/", state: { recodeArray: recodeArray } }}
          className="link_Style"
        >
          <img src={img_rank} alt="RANK" className="button_img" />
        </Link>
      </div>
      <div className="t_Contents">
        <Link to="/Rule" className="link_Style">
          <img src={img_howtoplay} alt="HowToPlay" className="button_img" />
        </Link>
      </div>

      <Route path="/Game" component={Game} />
      <Route path="/Rank" component={Rank} />
      <Route path="/Rule" component={Rule} />
    </div>
  );
};

export default withRouter(Main);
