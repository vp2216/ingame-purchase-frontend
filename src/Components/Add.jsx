import "./Styles/Add.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Add() {
  const [data, setData] = useState({
    offerid: "",
    offertitle: "",
    offerdesc: "",
    offerimage: "",
    offerimageurl: "",
    offercontent: "",
    offerto: "",
    offerpricecoins: 0,
    offerpricegems: 0,
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (data.offerimage) {
      const formdata = new FormData();
      formdata.append("file", data.offerimage);
      formdata.append("upload_preset", "vishnup");
      fetch("https://api.cloudinary.com/v1_1/vishnup/image/upload", {
        method: "POST",
        body: formdata,
      })
        .then((res) => res.json())
        .then((url) => {
          setData({ ...data, offerimageurl: url.url, offerimage: "" });
        });
    }
  }, [data.offerimage]);

  function add(e) {
    e.preventDefault();
    if (
      !data.offercontent ||
      !data.offerdesc ||
      !data.offerid ||
      !data.offerimageurl ||
      !data.offertitle ||
      !data.offerto ||
      !data.offerpricecoins ||
      !data.offerpricegems
    ) {
      setMessage("Some importent fields are missing");
      return;
    }
    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    formData.append("offerid", data.offerid);
    formData.append("offerdesc", data.offerdesc);
    formData.append("offerimageurl", data.offerimageurl);
    formData.append("offercontent", data.offercontent);
    formData.append("offerto", data.offerto);
    formData.append("offerpricecoins", data.offerpricecoins);
    formData.append("offerpricegems", data.offerpricegems);
    formData.append("offertitle", data.offertitle);
      fetch("http://localhost:2090/offer/add", {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      }).then(navigate("/home"));
  }

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
            <button
              className="msg-btn"
              onClick={() => {
                setMessage("");
              }}
            >
              OK
            </button>
          </span>
        </div>
      ) : null}

      <div className="add-main">
        <span className="top">
          <button className="btn" onClick={() => navigate("/home")}>
            Back
          </button>
        </span>
        <form className="add-form">
          <input
            className="inputs add-input"
            placeholder="Offer_id"
            onChange={(e) => setData({ ...data, offerid: e.target.value })}
          />
          <input
            className="inputs add-input"
            placeholder="Offer_title"
            onChange={(e) => setData({ ...data, offertitle: e.target.value })}
          />
          <textarea
            className="inputs add-input"
            placeholder="Offer_description"
            onChange={(e) => setData({ ...data, offerdesc: e.target.value })}
            rows={4}
          ></textarea>
          <input
            type="file"
            accept="image/*"
            className="inputs add-input"
            placeholder="Offer_image"
            onChange={(e) =>
              setData({ ...data, offerimage: e.target.files[0] })
            }
          />
          <textarea
            className="inputs add-input"
            placeholder="Offer_content (':' for quantity and ',' for each content, eg: Coins:10000,Gems:100)"
            onChange={(e) => setData({ ...data, offercontent: e.target.value })}
            rows={4}
          ></textarea>
          <span className="date">
            <label className="label" htmlFor="to">
              Offer_schedule_to :{" "}
            </label>
            <input
              id="to"
              type="date"
              className="inputs add-input"
              onChange={(e) => setData({ ...data, offerto: e.target.value })}
            />
          </span>
          <input
            className="inputs add-input"
            placeholder="Offer_price_coins"
            onChange={(e) =>
              setData({ ...data, offerpricecoins: e.target.value })
            }
          />
          <input
            className="inputs add-input"
            placeholder="Offer_price_gems"
            onChange={(e) =>
              setData({ ...data, offerpricegems: e.target.value })
            }
          />
          <button
            className="btn"
            onClick={add}
            disabled={message ? true : false}
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
}

export default Add;
