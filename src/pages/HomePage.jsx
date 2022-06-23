import "../App.css";
import dogimg from "../images/hpdog3.png";

function HomePage() {
  return (
    <div className="App">
      <div className="card content-medium home">
        <div>
          <h2 className="title">PUP-PALS</h2>
          <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit vero dolore aperiam nostrum veritatis atque dicta, amet soluta repellendus! Reiciendis nihil ea et animi. Quia aliquam distinctio quaerat maxime a.</p>
        </div>
        <div>
          <img src={dogimg} alt="placholder"/>
        </div>
      </div>
    </div>
  
  );
}

export default HomePage;
