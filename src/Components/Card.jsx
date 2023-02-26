import "./Styles/Card.css";
import { userContext } from "./Home";
import { useContext } from "react";

export default function Card({ data, setMessage }) {
  const { user, token } = useContext(userContext);

  function buywithcoin() {
    const formData = new FormData();
    formData.append("item", data.offerid);
    formData.append("payment", "coin");
    fetch("http://localhost:2090/offer/buy", {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((msg) => setMessage(msg.message));
  }

  function buywithgem() {
    const formData = new FormData();
    formData.append("item", data.offerid);
    formData.append("payment", "gem");
    fetch("http://localhost:2090/offer/buy", {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((msg) => setMessage(msg.message));
  }

  return (
    <div
      className={
        user.packs.includes(data.offerid) || new Date() > new Date(data.offerto)
          ? "card-main card-disabled"
          : "card-main"
      }
    >
      <span className="offer-title">{data.offertitle}</span>
      <span className="offer-desc">{data.offerdesc}</span>
      <img src={data.offerimageurl} className="offer-image" />
      <span className="offer-content">
        {data.offercontent.split(",").map((data, i) => {
          const [content, quantity] = data.split(":");
          return (
            <span key={i}>
              {content} x {quantity}
            </span>
          );
        })}
      </span>
      {user.packs.includes(data.offerid) ? (
        <span className="offer-expire">Purchased</span>
      ) : (
        <>
          {new Date() > new Date(data.offerto) ? (
            <span className="offer-expire">Expired on {data.offerto}</span>
          ) : (
            <span className="offer-expire">Expires on {data.offerto}</span>
          )}
        </>
      )}
      <span className="offer-btns">
        {data.offerpricecoins ? (
          <button
            className="offer-btn"
            disabled={
              user.packs.includes(data.offerid) ||
              new Date() > new Date(data.offerto)
                ? true
                : false
            }
            onClick={buywithcoin}
          >
            {data.offerpricecoins} coins
          </button>
        ) : null}
        <button
          className="offer-btn"
          disabled={
            user.packs.includes(data.offerid) ||
            new Date() > new Date(data.offerto)
              ? true
              : false
          }
          onClick={buywithgem}
        >
          {data.offerpricegems} gems
        </button>
      </span>
    </div>
  );
}
