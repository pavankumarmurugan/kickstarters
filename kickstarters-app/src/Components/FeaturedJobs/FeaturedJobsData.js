import "./FeaturedJobs.css";

function FeaturedData(props) {
  return (
    <div className="t-card">
      <div className="t-image">
        <img src={props?.image} alt="image" />
      </div>
      <h4>{props?.heading}</h4>
      <p>{props?.text1}</p>
      <p>{props?.text2}</p>
    </div>
  );
}

export default FeaturedData;
