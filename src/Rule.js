import React from "react";
import img_title from "./img/AtoZ_title.png";
import img_rule from "./img/rule.png";
import img_goBack from "./img/GoBack.png";

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
      <div className="main-title">
        <img src={img_title} alt="title_image" className="title_img" />
      </div>
      <div className="t_Contents_rule">
        <img src={img_rule} alt="rule_image" className="rule_img" />
      </div>
      <div className="t_Contents_foot">
        <img
          src={img_goBack}
          alt="GoBack"
          onClick={fn_goBack}
          className="back_img"
        />
      </div>
    </div>
  );
};

export default Rule;
