import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainComponent } from "../MainComponent"

export const Router =() =>{
    return<>
    <BrowserRouter>
    <Routes>
        <Route path="" element={<MainComponent></MainComponent>}></Route>
    </Routes>
    </BrowserRouter>
    </>
}