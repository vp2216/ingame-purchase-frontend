import { useEffect, useState } from "react";
import "./Styles/Login.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    playerid: "",
    age: 0,
    password: "",
  });

  function register(e) {
    e.preventDefault();
    if (!data.playerid || !data.age || !data.password) {
      setMessage("Enter all fields");
      return;
    }
    if (data.age < 18) {
      setMessage("You should be 18 or above to register");
      return;
    }
    const formdata = new FormData();
    formdata.append("player", data.playerid);
    formdata.append("age", data.age);
    formdata.append("password", data.password);
    fetch("http://localhost:2090/user/register", {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      });
  }

  useEffect(() => {
    if (message == "Registration successful") {
      setTimeout(() => {
        setMessage("");
        navigate("/login");
      }, 5000);
    } else {
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  }, [message]);

  return (
    <>
      {message ? (
        <div className="message">
          <span className="msg-span">
            <div className="msg-body">{message}</div>
            <button
              className="msg-btn"
              onClick={() => {
                if (message == "Registration successful") {
                  setMessage("");
                  navigate("/login");
                } else setMessage("");
              }}
            >
              OK
            </button>
          </span>
        </div>
      ) : null}

      <div className="login-main">
        <h1 className="name">Battle Store</h1>
        <form className="form">
          <input
            placeholder="Player Id"
            className="inputs"
            onChange={(e) => setData({ ...data, playerid: e.target.value })}
          />
          <input
            placeholder="Age"
            className="inputs"
            type="number"
            onChange={(e) => setData({ ...data, age: e.target.value })}
          />
          <input
            placeholder="Password"
            className="inputs"
            type="password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button
            className="btn"
            onClick={register}
            disabled={message ? true : false}
          >
            Register
          </button>
        </form>
        <span className="warn">
          all the items will be sent based on the player id so make sure you
          give the correct player id.
        </span>
      </div>
    </>
  );
}

export default Register;
