import React, { useState, useEffect, useRef } from "react";
import DisplayTimer from "./components/DisplayTimer";

/* 변수 선언 ****************************************************/
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const shuffleNum = [
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
];

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Game = (props) => {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0 });

  const [a1, setA1] = useState();
  const [a2, setA2] = useState();
  const [a3, setA3] = useState();
  const [a4, setA4] = useState();
  const [b1, setB1] = useState();
  const [b2, setB2] = useState();
  const [b3, setB3] = useState();
  const [b4, setB4] = useState();
  const [c1, setC1] = useState();
  const [c2, setC2] = useState();
  const [c3, setC3] = useState();
  const [c4, setC4] = useState();
  const [d1, setD1] = useState();
  const [d2, setD2] = useState();
  const [d3, setD3] = useState();
  const [d4, setD4] = useState();

  const [nextVal, setNextVal] = useState();
  const [order, setOrder] = useState();
  const [userOrder, setUserOrder] = useState(0);
  const [color, setColor] = useState("white");
  const [status, setStatus] = useState(true);

  const getRandomVal = () => {
    //console.log("getRandomVal");
    //초기화
    for (let i = 0; i < 26; i++) {
      shuffleNum[i] = "empty";
    }
    //알파벳 섞기
    for (let i = 0; i < 26; i++) {
      var shuffleTF = true;
      var randomVal = 0;

      while (shuffleTF) {
        if (i < 11) {
          randomVal = Math.floor(Math.random() * 16 + i);
        } else {
          randomVal = Math.floor(Math.random() * 26);
        }

        if (shuffleNum[randomVal] === "empty") {
          shuffleNum[randomVal] = alphabet[i];
          shuffleTF = false;
        }
      }
    }

    // for (let i = 0; i < 26; i++) {
    //   console.log("i : " + i + " [ " + shuffleNum[i] + " ] ");
    // }
  };

  //다음 값 세팅
  const fn_settingNextVal = (targetId) => {
    switch (targetId) {
      case "a1":
        return setA1(nextVal);
      case "a2":
        return setA2(nextVal);
      case "a3":
        return setA3(nextVal);
      case "a4":
        return setA4(nextVal);
      case "b1":
        return setB1(nextVal);
      case "b2":
        return setB2(nextVal);
      case "b3":
        return setB3(nextVal);
      case "b4":
        return setB4(nextVal);
      case "c1":
        return setC1(nextVal);
      case "c2":
        return setC2(nextVal);
      case "c3":
        return setC3(nextVal);
      case "c4":
        return setC4(nextVal);
      case "d1":
        return setD1(nextVal);
      case "d2":
        return setD2(nextVal);
      case "d3":
        return setD3(nextVal);
      case "d4":
        return setD4(nextVal);
      default:
        return;
    }
  };

  const fn_alert = (color) => {
    fn_colorChange(color);
    setTimeout(() => {
      fn_colorChange("white");
    }, 100);
    setTimeout(() => {
      fn_colorChange(color);
    }, 200);
    setTimeout(() => {
      fn_colorChange("white");
    }, 300);
  };

  const fn_colorChange = (color) => {
    setColor(color);
  };

  const fn_goBack = () => {
    if (!status) {
      props.history.push({
        pathname: "/",
        state: {
          readRecode: "true",
          recodeM: time.m,
          recodeS: time.s,
          recodeMs: time.ms,
        },
      });
    }
  };

  useEffect(() => {
    console.log("useEffect");
    getRandomVal();
    setA1(shuffleNum[0]);
    setA2(shuffleNum[1]);
    setA3(shuffleNum[2]);
    setA4(shuffleNum[3]);
    setB1(shuffleNum[4]);
    setB2(shuffleNum[5]);
    setB3(shuffleNum[6]);
    setB4(shuffleNum[7]);
    setC1(shuffleNum[8]);
    setC2(shuffleNum[9]);
    setC3(shuffleNum[10]);
    setC4(shuffleNum[11]);
    setD1(shuffleNum[12]);
    setD2(shuffleNum[13]);
    setD3(shuffleNum[14]);
    setD4(shuffleNum[15]);

    setNextVal(shuffleNum[16]);
    setOrder(17);
  }, []);

  var updateMs = time.ms,
    updateS = time.s,
    updateM = time.m;

  /* 타이머 세팅 ***************************************************/
  const timer = useInterval(() => {
    if (status) {
      updateMs++;

      if (updateMs === 100) {
        updateS++;
        updateMs = 0;
      }

      if (updateS === 60) {
        updateM++;
        updateS = 0;
      }

      setTime({ ms: updateMs, s: updateS, m: updateM });
    } else {
      clearInterval(timer);
    }
  }, 10);

  /* 게임 세팅 ****************************************************/
  const buttonClick = (e) => {
    //값이 맞는지 검증 맞으면 다음알파벳 세팅, 다르면 오류표시
    var targetId = e.target.id.substring(7, 9);

    if (e.target.name === "Z" && userOrder === 25) {
      fn_settingNextVal(targetId);
      fn_alert("green");
      setStatus(false);
    } else if (e.target.name === alphabet[userOrder]) {
      setUserOrder(userOrder + 1);
      setOrder(order + 1);
      setNextVal(shuffleNum[order]);
      fn_settingNextVal(targetId);
    } else {
      if (status) {
        fn_alert("red");
      } else {
        fn_goBack("");
      }
    }
  };

  /* 리턴 ****************************************************/
  return (
    <div className="atoz-template">
      <div className="timer" style={{ background: color }} onClick={fn_goBack}>
        <DisplayTimer time={time} />
      </div>
      <div className="game_template">
        <div className="game_div">
          <div className="game_inner_div">
            <button
              className="game_button"
              onClick={buttonClick}
              id="button_a1"
              name={a1}
            >
              {a1}
            </button>
          </div>
          <div className="game_inner_div">
            <button
              className="game_button"
              onClick={buttonClick}
              id="button_a2"
              name={a2}
            >
              {a2}
            </button>
          </div>
          <div className="game_inner_div">
            <button
              className="game_button"
              onClick={buttonClick}
              id="button_a3"
              name={a3}
            >
              {a3}
            </button>
          </div>
          <div className="game_inner_div">
            <button
              className="game_button"
              onClick={buttonClick}
              id="button_a4"
              name={a4}
            >
              {a4}
            </button>
          </div>
        </div>
        <div className="game_div">
          <div className="game_inner_div">
            <button
              className="game_button"
              onClick={buttonClick}
              id="button_b1"
              name={b1}
            >
              {b1}
            </button>
          </div>
          <div className="game_inner_div">
            <button
              className="game_button"
              onClick={buttonClick}
              id="button_b2"
              name={b2}
            >
              {b2}
            </button>
          </div>
          <div className="game_inner_div">
            <button
              className="game_button"
              onClick={buttonClick}
              id="button_b3"
              name={b3}
            >
              {b3}
            </button>
          </div>
          <div className="game_inner_div">
            <button
              className="game_button"
              onClick={buttonClick}
              id="button_b4"
              name={b4}
            >
              {b4}
            </button>
          </div>
        </div>
        <div className="game_div">
          <div className="game_inner_div">
            <button
              className="game_button"
              onClick={buttonClick}
              id="button_c1"
              name={c1}
            >
              {c1}
            </button>
          </div>
          <div className="game_inner_div">
            <button
              className="game_button"
              onClick={buttonClick}
              id="button_c2"
              name={c2}
            >
              {c2}
            </button>
          </div>
          <div className="game_inner_div">
            <button
              className="game_button"
              onClick={buttonClick}
              id="button_c3"
              name={c3}
            >
              {c3}
            </button>
          </div>
          <div className="game_inner_div">
            <button
              className="game_button"
              onClick={buttonClick}
              id="button_c4"
              name={c4}
            >
              {c4}
            </button>
          </div>
        </div>
        <div className="game_div">
          <div className="game_inner_div">
            <button
              className="game_button"
              onClick={buttonClick}
              id="button_d1"
              name={d1}
            >
              {d1}
            </button>
          </div>
          <div className="game_inner_div">
            <button
              className="game_button"
              onClick={buttonClick}
              id="button_d2"
              name={d2}
            >
              {d2}
            </button>
          </div>
          <div className="game_inner_div">
            <button
              className="game_button"
              onClick={buttonClick}
              id="button_d3"
              name={d3}
            >
              {d3}
            </button>
          </div>
          <div className="game_inner_div">
            <button
              className="game_button"
              onClick={buttonClick}
              id="button_d4"
              name={d4}
            >
              {d4}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
