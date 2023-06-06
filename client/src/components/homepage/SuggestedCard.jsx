import cardProfile from "../../assets/cardProfile.png";
import replyIcon from "../../assets/replyIcon.png";
import "./homepage.css";
const SuggestedCard = ({ data }) => {
  const { question } = data;
  return (
    <div className="suggestedBox">
      <div className="suggested-card">
        <img
          src={cardProfile}
          alt="profile"
          className="suggested-card-profile"
        />
        <div className="suggested-card-info">
          <p className="suggested-card-title">{question}</p>
          <button className="suggested-card-btn">
            <img src={replyIcon} alt="reply" />
            Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuggestedCard;
