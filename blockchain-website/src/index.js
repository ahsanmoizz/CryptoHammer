// src/App.js
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import CreateAuction from "./pages/CreateAuction";
import FinalizeBid from "./pages/FinalizeBid";
import MyBids from "./pages/MyBids";
import Withdraw from "./pages/withdraw";
import AuctionList from "./pages/AuctionList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="createauction" element={<CreateAuction />} />
          <Route path="finalizebid" element={<FinalizeBid />} />
          <Route path="mybids" element={<MyBids />} />
          <Route path="auctionlist" element={< AuctionList/>} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
