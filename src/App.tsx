import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import MainPage from './atomic/pages/MainPage/MainPage.tsx'
import GeneralOverViewPage from './atomic/pages/GeneralOverviewPage/GeneralOverViewPage.tsx'
import ProjectHeader from './atomic/organisms/ProjectHeader/ProjectHeader.tsx'
import Header from './atomic/organisms/Header/Header.tsx'

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Routes>
                    <Route element={<Header />}>
                        <Route path="/" element={<MainPage />} />
                    </Route>
                    <Route element={<ProjectHeader />}>
                        <Route
                            path="/project/:id"
                            element={<GeneralOverViewPage />}
                        />
                    </Route>
                </Routes>
            </Provider>
        </BrowserRouter>
    )
}

export default App
