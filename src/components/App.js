import React, { useState } from "react"
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"

import NavBar from "./UI/NavBar/NavBar.jsx"

import Home from "./pages/home/Home.jsx"
import Docs from "./pages/docs/Docs.jsx"
import About from "./pages/about/About.jsx"
import Editor from "./pages/editor/Editor.jsx"
import P404 from "./pages/404/404.jsx"

export default function App(props) {
    const pagesList = [
        {url: "/", name: "Home", element: <Home />},
        {url: "/docs", name: "Docs", element: <Docs />},
        {url: "/about", name: "About", element: <About />},
        {url: "/editor", name: "Editor", element: <Editor />},
    ]

    return (
        <Router>
            <div>
                <NavBar pagesList={pagesList}/>
                <Routes>
                    {pagesList.map((page, index) => 
                        <Route path={page.url} element={page.element} key={index}/>
                    )}
                    <Route path="*" element={<P404 />}/>
                </Routes>
            </div>
        </Router>
    )
}