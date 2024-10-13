import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/header';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/Home'
import IntroductionPage from './pages/IntroductionPage'
import SkillGamePage from './pages/SkillGamePage';
import PreSkillPage from './pages/PreSkillPage';
import SkillMinimalist from './pages/SkillMinimalistPage';
import './App.css'



const App = () => {
    let [isLoading, setIsLoading] = useState(false); // Mover el hook dentro de un componente funcional

    return (
        <div>
            
            <Router>
                <Header/>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/introduction" component={IntroductionPage} />
                    <Route path="/skills" component={PreSkillPage} />
                    <Route path="/skills-list" component={SkillMinimalist} />
                    <Route path="/skill-game" component={SkillGamePage} />
                    <Route
                        path="/login"
                        render={() => (
                            <LoginPage isLoading={isLoading} setIsLoading={setIsLoading} login={ true } />    
                        )}
                    />
                    <Route
                        path="/register"
                        render={() => (
                            <LoginPage isLoading={isLoading} setIsLoading={setIsLoading} login={ false } />    
                        )}
                    />
                </Switch>
            </Router>
        </div>
    );
};


export default App;