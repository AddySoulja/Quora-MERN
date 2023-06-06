import "./homepage.css";
import foodIcon from "../../assets/foodIcon.png";
import businessIcon from "../../assets/businessIcon.png";
import psychologyIcon from "../../assets/psychologyIcon.png";
import musicIcon from "../../assets/musicIcon.png";
import scienceIcon from "../../assets/scienceIcon.png";
import moviesIcon from "../../assets/moviesIcon.png";
import technologyIcon from "../../assets/technologyIcon.png";
import photographyIcon from "../../assets/photographyIcon.png";
import sportsIcon from "../../assets/sportsIcon.png";
const options = [
  {
    name: "Food",
    icon: foodIcon,
  },
  {
    name: "Business",
    icon: businessIcon,
  },
  {
    name: "Psychology",
    icon: psychologyIcon,
  },
  {
    name: "Music",
    icon: musicIcon,
  },
  {
    name: "Science",
    icon: scienceIcon,
  },
  {
    name: "Movies",
    icon: moviesIcon,
  },
  {
    name: "Technology",
    icon: technologyIcon,
  },
  {
    name: "Photography",
    icon: photographyIcon,
  },
  {
    name: "Sports",
    icon: sportsIcon,
  },
];

const Sidebar = () => {
  return (
    <>
      {options.map((item, idx) => (
        <div className="sidebarOption" key={`${item.name}${idx}`}>
          <img src={item.icon} alt={item.name} />
          <p className="text">{item.name}</p>
        </div>
      ))}
    </>
  );
};

export default Sidebar;
