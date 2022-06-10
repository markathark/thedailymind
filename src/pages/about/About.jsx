import "./about.css";

const About = (props) => {
  return (
    <div className="page-wrapper">
      <h1>About</h1>
      <div>
        The daily mind is a web app to keep track of and organize the recurring
        activities and data of our lives. <br />
        <br />
        <br />
      </div>
      <div>
        <button
          onClick={() => {
            localStorage.clear();
          }}
        >
          Click here to clear all data
        </button>
      </div>
    </div>
  );
};

export default About;
