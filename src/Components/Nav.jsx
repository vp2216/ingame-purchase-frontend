import "./Styles/Nav.css";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "./Home";

function Nav({ setIssearching, searchvalue, setSearchvalue }) {
  const [admin, setAdmin] = useState(false);

  const navigate = useNavigate();

  const { user, setUser, token } = useContext(userContext);

  useEffect(() => {
    if (user.player == "VP2216") setAdmin(true);
  }, [user]);

  return (
    <div className="nav">
      <span className="logo">Battle Store</span>
      <span className="search">
        {token && user ? (
          <span className="nav-span">
            <input
              className="nav-input"
              placeholder="Search..."
              value={searchvalue}
              onChange={(e) => setSearchvalue(e.target.value)}
            />
            <button className="nav-btn" onClick={() => setIssearching(true)}>
              Search
            </button>
            {admin ? (
              <button
                className="nav-btn"
                onClick={() => navigate("/admin/add")}
              >
                Add
              </button>
            ) : null}
            <button
              className="nav-btn"
              onClick={() => {
                sessionStorage.removeItem("token");
                setUser("");
                navigate("/");
              }}
            >
              Logout
            </button>
          </span>
        ) : null}
        <span className="showcoins">
          <span>
            Coins : <span className="coins">{user.coins}</span>
          </span>
          <span>
            Gems : <span className="coins">{user.gems}</span>
          </span>
        </span>
      </span>
    </div>
  );
}

export default Nav;
