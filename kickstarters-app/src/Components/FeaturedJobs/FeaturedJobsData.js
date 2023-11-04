import "./FeaturedJobs.css";

function FeaturedData(props) {
  return (
    <div className="t-card">
      {/* <div className="t-image">
        <img src={props?.image} alt="image" />
      </div> */}
      <div className="jobtitle-salary">
        <h4>{props?.heading}</h4>
        <p>{props?.salary}</p>
      </div>
      <p>{props?.desc}</p>
    </div>
  );
}

export default FeaturedData;
