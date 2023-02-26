import "./Styles/Main.css";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import Card from "./Card";

export const userContext = createContext();

function Home() {
  const [user, setUser] = useState("load");
  const [offers, setOffers] = useState([]);
  const [searchresult, setSearchresult] = useState([]);
  const [searchvalue, setSearchvalue] = useState("");
  const [issearching, setIssearching] = useState(false);
  const [message, setMessage] = useState("");

  const token = sessionStorage.getItem("token");

  const value = { user, setUser, token };

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetch("http://localhost:2090/offer/finduser", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data.data);
        });
    }
  }, [user]);

  useEffect(() => {
    fetch("http://localhost:2090/offer/getoffers", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setOffers(data.offers));
  }, []);

  useEffect(() => {
    if (issearching) {
      if (!searchvalue) {
        setSearchresult([]);
        setIssearching(false);
      }
      const data = offers.filter((e) => {
        return e.offertitle.toLowerCase().includes(searchvalue.toLowerCase());
      });
      setSearchresult(data);
      setIssearching(false);
      setSearchvalue("");
    }
  }, [issearching]);

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 5000);
  }, [message]);

  return (
    <>
      {message ? (
        <div className="message">
          <span className="msg-span">
            <div className="msg-body">{message}</div>
            <button className="msg-btn" onClick={() => setMessage("")}>
              OK
            </button>
          </span>
        </div>
      ) : null}

    <userContext.Provider value={value}>
      <div className="main">
        <Nav
          setIssearching={setIssearching}
          searchvalue={searchvalue}
          setSearchvalue={setSearchvalue}
        />
        {token && user ? (
          <div className="main-body">
            {searchresult.length != 0
              ? searchresult.map((data, i) => {
                  return (
                    <div key={i} className="offer-cards">
                      <Card data={data} />
                    </div>
                  );
                })
              : offers.map((data, i) => {
                  return (
                    <div key={i} className="offer-cards">
                      <Card data={data} setMessage={setMessage} />
                    </div>
                  );
                })}
          </div>
        ) : (
          <div className="nologin">
            <span className="expired">Session expired</span>
            <button className="btn" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        )}
      </div>
      </userContext.Provider>
      </>
  );
}

export default Home;
