import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Signup } from "./pages/signup";
import { Admin } from "./pages/admin";
import { Single } from "./pages/single";
import { Tickets } from "./pages/tickets";
import injectContext from "./store/appContext";



import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer";
import { Artist_card } from "./component/Artist-card.jsx";

import { Artist_grid } from "./pages/artist.js";
import { AllNews } from "./pages/news.js";
import { ArtistSingleView } from "./pages/single-artist";
import { AdminPanel } from "./pages/admin_panel";
import { AdminNewsUpdatePanel } from "./pages/news_update";
import { AdminNewsCreatePanel } from "./pages/news_create";
import { AdminArtistsPanel } from "./pages/artist_update";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<Admin />} path="/admin" />
            <Route element={<Tickets />} path="/tickets" />
            <Route element={<Artist_grid />} path="/artist" />
            <Route element={<ArtistSingleView />} path="/artist/:artist_ID" />

            <Route element={<AdminPanel />} path="/admin" />
            <Route element={<AdminNewsUpdatePanel />} path="/admin/news/update/:news_ID" />
            <Route element={<AdminArtistsPanel />} path="/admin/artist/:artist_ID"/>
            <Route element={<AdminNewsCreatePanel />} path="/admin/news/create"/>

            <Route element={<AllNews />} path="/news" />

            <Route element={<h1>Not found!</h1>} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
