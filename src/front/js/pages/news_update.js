import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AdminNewsForm } from "../component/News-form.jsx";

export const AdminNewsUpdatePanel = () => {
  const [neww, setNeww] = useState({});
  const { news_ID } = useParams();

  const getNew = async (url) => {
    const headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    const request = {
      method: "GET",
      headers: headers,
    };
    console.log("ok");
    const response = await fetch(url, request);
    if (response.ok) {
      const data = await response.json();
      setNeww(data.results);
    }
  };

  useEffect(() => {
    getNew(process.env.BACKEND_URL + "/api/news/" + news_ID);
  }, []);
  return (
    <div className="mx-5">
      <Link to="/admin" className="second-title" style={{ textDecoration: "none" }}>
        <h1>ADMIN PANEL</h1>
      </Link>
      {/* <hr className="mx-4" /> */}
      <AdminNewsForm
        title={neww.title}
        body={neww.body}
        imageUrl={neww.imageUrl}
      />
    </div>
  );
};
