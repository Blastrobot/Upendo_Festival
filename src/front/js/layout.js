import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { LandingPage } from "./pages/landing_page";
import { Home } from "./pages/home";
import { Signup } from "./pages/signup";
import { Single } from "./pages/single";
import { Tickets } from "./pages/tickets";
import { Cancel } from "./pages/cancel";
import { Success } from "./pages/success";
import { Checkout } from "./pages/checkout";
import { ProductDisplay } from "./pages/checkout";

import injectContext from "./store/appContext";
import { CartProvider } from "./store/cartContext";

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

const MainLayout = ({ children }) => {
  return (
    // Here is rendering the routes inside route MainLayout, that way Nav and Footer is kept
    // on the whole application, while LandingPage is excluded from that
    <>
    <Navbar/>
      <Outlet></Outlet>
    <Footer/>
    </>
  );
};

const Layout = () => {

  const basename = process.env.BASENAME || "";

  return (
      <CartProvider>
        <BrowserRouter basename={basename}>
          <ScrollToTop>
            <Routes>
              <Route element={<LandingPage />} path="/"/>
              <Route element={<MainLayout />}>
                <Route element={<Home />} path="/home" />
                <Route element={<Signup />} path="/signup" />
                <Route element={<Tickets />} path="/tickets" />
                <Route element={<Artist_grid />} path="/artist" />
                <Route element={<ArtistSingleView />} path="/artist/:artist_ID" />
                <Route element={<AllNews />} path="/news" />
                <Route element={<AdminPanel />} path="/admin" />
                <Route
                  element={<AdminNewsUpdatePanel />}
                  path="/admin/news/update/:news_ID"
                />
                <Route
                  element={<AdminArtistsPanel />}
                  path="/admin/artist/:artist_ID"
                />
                <Route
                  element={<AdminNewsCreatePanel />}
                  path="/admin/news/create"
                />
                <Route element={<h1>Not found!</h1>} />
                <Route element={<Success />} path="?success=true"/>
                <Route element={<Cancel />} path="?canceled=true"/>
              </Route>
            </Routes>
          </ScrollToTop>
        </BrowserRouter>
      </CartProvider>
  );
};

export default injectContext(Layout);
