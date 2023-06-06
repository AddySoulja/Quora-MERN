import React, { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import heartIcon from "../../assets/heartIcon.png";
import commentIcon from "../../assets/commentIcon.png";
import shareIcon from "../../assets/shareIcon.png";
import cardProfile from "../../assets/cardProfile.png";
import heartIconBlack from "../../assets/heartIconBlack.png";
import replyIconRev from "../../assets/replyIconRev.png";
import reportIcon from "../../assets/reportIcon.png";

import { answerFormat } from "../../utils/constants";

type Answer = { answer: string, answeredby: string };

type PostProps = {
  data: { id: undefined, question: string, by: string, answers: Array<Answer>, likes: number },
}

const Post = ({ data }: PostProps) => {
  const { id, question, by, answers, likes } = data;

  const [showAnswers, setShowAnswers] = useState(false);
  const [answer, setAnswer] = useState(answerFormat);
  // // const [questionOnDisplay, setQuestionOnDisplay] = useState(data);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async () => {
    setAnchorEl(null);
  };
  return (
    <div className="post-layout" key={id}>
      <div className="post-content">
        <div className="post-content-top">
          <img
            src={cardProfile}
            alt="profile"
            className="profile"
          />
          <div className="username-display">{by}</div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVert />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 40 * 4.5,
                width: "auto",
              },
            }}
          >
            <MenuItem onClick={() => { }}>Delete</MenuItem>
          </Menu>
        </div>
        <div className="post-content-bottom">{question}</div>
      </div>
      <div className="post-details">
        <div className="likes-span"> <img src={heartIcon} alt="likes" />{likes} Likes</div>
        <div className="answers-span">
          {answers === undefined ? 0 : answers.length} answers
        </div>
      </div>
      <div className="controls">
        <button className="like">
          <img src={heartIcon} alt="likes" />
          Like</button>
        <div className="separator">|</div>
        <button className="comment" onClick={() => setShowAnswers(!showAnswers)}>
          <img src={commentIcon} alt="comment" />Answer
        </button>
        <div className="separator">|</div>
        <button className="share"><img src={shareIcon} alt="share" />share</button>
      </div>

      {showAnswers && (
        <form onSubmit={() => { }} className="input-controls">
          <div className="comment-info">          <img
            src={cardProfile}
            alt="profile"
            className="profile"
          />
            <div className="username-display">{by}</div></div>
          <textarea
            className="comment-text-field"
            name="answer"
            placeholder="Type your answer here..."
            onChange={(e) =>
              setAnswer({
                ...answer,
                answer: e.target.value,
                answeredby: user,
              })
            }
            value={answer.answer}
          />
          <button type="submit" className="comment-btn">
            Comment
          </button>
        </form>
      )}
      {showAnswers
        && answers.map((answer) => (
          <>
            <div className="input-controls">
              <img
                src={cardProfile}
                alt="profile"
                className="profile"
              />

              <div className="comment-wrapper">
                <div className="comment-wrapper-user">{answer.answeredby}</div>
                <div className="comment-content">{answer.answer}</div>
              </div>
            </div>
            <div className="comment-input-controls">

              <button type="button" className="comment-control-btn"><img src={heartIconBlack} alt="like" />Like</button>
              <button type="button" className="comment-control-btn"><img src={replyIconRev} alt="reply" />Reply</button>
              <button type="button" className="comment-control-btn"><img src={reportIcon} alt="report comment" />Report</button>
            </div>
          </>
        ))
      }



    </div>
  );
}

export default Post